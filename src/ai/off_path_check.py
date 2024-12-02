import os
import numpy as np
import xml.etree.ElementTree as ET
from geopy.distance import geodesic
from fastdtw import fastdtw

class GPXProcessor:
    def __init__(self, max_distance_tolerance=20):
        self.max_distance_tolerance = max_distance_tolerance  # 거리 비교 허용 오차 (m)

    def extract_gpx_points(self, file_path):
        """GPX 파일에서 위도와 경도 추출"""
        points = []
        try:
            # GPX 파일을 XML로 파싱
            tree = ET.parse(file_path)
            root = tree.getroot()

            # GPX 파일에서 <trk> (track), <trkseg> (track segment), <trkpt> (track point) 태그를 찾음
            for trk in root.findall('{http://www.topografix.com/GPX/1/1}trk'):
                for trkseg in trk.findall('{http://www.topografix.com/GPX/1/1}trkseg'):
                    for trkpt in trkseg.findall('{http://www.topografix.com/GPX/1/1}trkpt'):
                        lat = float(trkpt.get('lat'))
                        lon = float(trkpt.get('lon'))
                        points.append((lat, lon))
        except Exception as e:
            print(f"GPX 파일을 파싱하는 중 오류가 발생했습니다: {file_path}. 오류: {e}")
        return points

    def calculate_path_length(self, path):
        """경로의 총 거리 계산 (경로에 따라 지리적 거리 측정)"""
        total_distance = 0
        for i in range(1, len(path)):
            total_distance += geodesic(path[i - 1], path[i]).meters
        return total_distance

    def calculate_deviation_rate(self, recommended_path, actual_path):
        """추천 경로와 새 경로 간 이탈률 계산"""
        total_points = len(recommended_path)
        if total_points == 0:
            return 100.0  # 추천 경로가 비어 있으면 완전히 이탈했다고 간주

        out_of_tolerance_count = 0

        for rec_point in recommended_path:
            # 추천 경로의 각 포인트에서 실제 경로와의 최소 거리 계산
            min_distance = min(geodesic(rec_point, act_point).meters for act_point in actual_path)
            if min_distance > self.max_distance_tolerance:
                out_of_tolerance_count += 1

        deviation_rate = (out_of_tolerance_count / total_points) * 100
        return deviation_rate


class GPXProcessorWithDTW(GPXProcessor):
    def __init__(self, max_distance_tolerance=20):
        super().__init__(max_distance_tolerance)

    def vectorize_path(self, path):
        """경로를 벡터로 변환 (위도와 경도를 하나의 벡터로 결합)"""
        return np.array([point for point in path])

    def calculate_dtw_similarity(self, path1, path2):
        """DTW 기반 경로 유사도 계산"""
        distance, _ = fastdtw(path1, path2)  # fastdtw를 사용해 DTW 거리 계산
        return 1 / (1 + distance)  # DTW 거리를 기반으로 유사도를 계산 (거리 작을수록 유사도 높음)

    def check_path_completion(self, recommended_path, actual_path):
        """추천 경로를 따라 뛰었는지 여부 확인"""
        deviation_rate = self.calculate_deviation_rate(recommended_path, actual_path)
        recommended_length = self.calculate_path_length(recommended_path)
        actual_length = self.calculate_path_length(actual_path)

        if deviation_rate <= 20:
            if actual_length >= recommended_length:
                if all(
                    min(geodesic(rec_point, act_point).meters for act_point in actual_path)
                    <= self.max_distance_tolerance
                    for rec_point in recommended_path
                ):
                    return "Perfect: 추천 경로를 완벽히 따라 뛰었습니다."
                else:
                    return "Over: 추천 경로를 따라 뛰었고, 추천 경로보다 더 뛰었습니다."
            else:
                return "Low: 추천 경로를 일부만 뛰었고, 추천 경로보다 덜 뛰었습니다."
        else:
            return f"Warning: 경로를 새 경로로 등록해야 합니다. 이탈률: {deviation_rate:.2f}%"

class PathClusterer:
    def __init__(self, processor, max_distance_tolerance=20):
        self.processor = processor
        self.max_distance_tolerance = max_distance_tolerance

    def extract_features(self, path):
        """경로에서 위도, 경도를 사용하여 특성 추출"""
        return np.array([point for point in path])  # 경로의 위도, 경도를 벡터로 반환

    def calculate_distance_matrix(self, paths):
        """경로들 간의 유사도를 기준으로 거리 행렬 생성"""
        n = len(paths)
        similarity_matrix = np.zeros((n, n))

        for i in range(n):
            for j in range(i + 1, n):
                try:
                    # 경로 간 유사도 계산
                    similarity = self.processor.calculate_dtw_similarity(paths[i][1], paths[j][1])
                    similarity_matrix[i][j] = similarity
                    similarity_matrix[j][i] = similarity
                except StopIteration:
                    # 결과가 없을 때는 경로 간 계산을 건너뛰거나 적절히 처리
                    print(f"경로 {i}와 경로 {j} 간 유사도 계산 중 오류 발생.")
                    similarity_matrix[i][j] = 0  # 유사도를 0으로 설정하여 계산을 건너뜀
                    similarity_matrix[j][i] = 0

        return similarity_matrix

    def cluster_paths(self, paths):
        """유사도를 기준으로 경로들을 비교하여 유사한 경로들을 그룹화"""
        # 경로들의 유사도 행렬 계산
        similarity_matrix = self.calculate_distance_matrix(paths)

        # 경로들을 클러스터링 하기 위한 데이터 구조
        visited = set()  # 방문한 경로를 추적
        clusters = []  # 최종 클러스터링 결과

        for i, file in enumerate(paths):
            if i in visited:
                continue  # 이미 클러스터에 포함된 경로는 건너뜀

            cluster = [file[0]]  # 첫 번째 경로를 클러스터에 포함
            visited.add(i)

            for j in range(i + 1, len(paths)):
                if j not in visited:
                    # 유사도가 90% 이상인 경우 같은 클러스터로 묶기
                    if similarity_matrix[i][j] >= 0.85 :
                        cluster.append(paths[j][0])
                        visited.add(j)

            if len(cluster) >= 3:  # 클러스터에 경로가 3개 이상이면 클러스터로 저장
                clusters.append(cluster)

        return clusters

    def extract_representative_from_clusters(self, clusters, paths):
        """각 클러스터에서 대표 경로 하나를 추출"""
        representative_paths = []
        non_representative_paths = []

        # 각 클러스터에서 첫 번째 경로를 대표 경로로 선정
        for cluster in clusters:
            representative_paths.append(cluster[0])  # 대표 경로는 각 클러스터의 첫 번째 파일
            for path in cluster[1:]:
                non_representative_paths.append(path)  # 나머지 경로는 비대표 경로로 분류

        return representative_paths, non_representative_paths


if __name__ == "__main__":
    # GPX 데이터 로드 및 경로 비교
    directory_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering"
    gpx_processor = GPXProcessorWithDTW(max_distance_tolerance=20)

    # GPX 파일 로드
    gpx_files = [
        (file, gpx_processor.extract_gpx_points(os.path.join(directory_path, file)))
        for file in os.listdir(directory_path) if file.endswith(".gpx")
    ]
    
    # 추천 경로와 실제 경로의 비교
    recommended_path = gpx_processor.extract_gpx_points("C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a1.gpx")
    actual_path = gpx_processor.extract_gpx_points("C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a2.gpx")

    # 실제 경로와 추천 경로 비교
    result = gpx_processor.check_path_completion(recommended_path, actual_path)
    print(f"{result}")

    # 경로 유사도 비교 및 군집화
    path_clusterer = PathClusterer(gpx_processor)
    clusters = path_clusterer.cluster_paths(gpx_files)

    # 각 클러스터에서 대표 경로를 추출하고, 비대표 경로와 분리
    representative_paths, non_representative_paths = path_clusterer.extract_representative_from_clusters(clusters, gpx_files)

    # 결과 출력
    for i, cluster in enumerate(clusters):
        print(f"\ncluster {i} 경로:")
        for path in cluster:
            print(f"- {path}")

        # 해당 클러스터의 대표 경로 출력
        print(f"\ncluster {i} 대표경로:")
        if cluster:
            print(f"- {cluster[0]}")  # 첫 번째 경로가 대표 경로

        # 해당 클러스터의 비대표 경로 출력
        print(f"\ncluster {i} 비대표경로:")
        non_rep_paths = [path for path in cluster if path != cluster[0]]  # 대표 경로를 제외한 나머지
        for non_rep_path in non_rep_paths:
            print(f"- {non_rep_path}")

    