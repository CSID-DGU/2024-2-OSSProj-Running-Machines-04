from sklearn.cluster import DBSCAN
import numpy as np
import os
import xml.etree.ElementTree as ET
from geopy.distance import geodesic
from sklearn.metrics.pairwise import cosine_similarity

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

    def calculate_vector_similarity(self, path1, path2):
        """코사인 유사도로 경로 유사도 계산"""
        path1_vec = self.vectorize_path(path1)
        path2_vec = self.vectorize_path(path2)

        # 경로의 벡터들 간의 코사인 유사도 계산
        similarity = cosine_similarity(path1_vec, path2_vec)
        return similarity.mean()  # 평균 유사도를 반환

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
    def __init__(self, processor, max_distance_tolerance=20, eps=0.05, min_samples=5):
        self.processor = processor
        self.max_distance_tolerance = max_distance_tolerance
        self.eps = eps  # DBSCAN의 eps (거리 기준)
        self.min_samples = min_samples  # DBSCAN의 min_samples (군집 최소 점수)

    def extract_features(self, path):
        """경로에서 위도, 경도를 사용하여 특성 추출"""
        return np.array([point for point in path])  # 경로의 위도, 경도를 벡터로 반환

    def calculate_distance_matrix(self, paths):
        """경로들 간의 이탈률을 기준으로 거리 행렬 생성"""
        n = len(paths)
        distance_matrix = np.zeros((n, n))

        for i in range(n):
            for j in range(i + 1, n):
                # 경로 간 이탈률 계산
                try:
                    deviation_rate = self.processor.calculate_deviation_rate(paths[i][1], paths[j][1])
                    distance_matrix[i][j] = deviation_rate
                    distance_matrix[j][i] = deviation_rate
                except StopIteration:
                    # 결과가 없을 때는 경로 간 계산을 건너뛰거나 적절히 처리
                    print(f"경로 {i}와 경로 {j} 간 이탈률 계산 중 오류 발생.")
                    distance_matrix[i][j] = np.inf  # 이탈률을 무한대로 설정하여 계산을 건너뜀
                    distance_matrix[j][i] = np.inf

        return distance_matrix

    def cluster_paths(self, paths):
        """DBSCAN을 사용하여 경로 군집화"""
        # 경로들의 거리 행렬 계산
        distance_matrix = self.calculate_distance_matrix(paths)
        
        # DBSCAN 모델
        clustering = DBSCAN(eps=self.eps, min_samples=self.min_samples, metric="precomputed")
        clustering.fit(distance_matrix)

        # 군집화된 경로들 출력
        clustered_paths = {}
        for cluster_id in set(clustering.labels_):
            clustered_paths[cluster_id] = []

        for i, file in enumerate(paths):
            cluster_id = clustering.labels_[i]
            clustered_paths[cluster_id].append(file[0])

        return clustered_paths


if __name__ == "__main__":
    # GPX 데이터 로드 및 경로 비교
    directory_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering"
    gpx_processor = GPXProcessorWithDTW(max_distance_tolerance=20)

    gpx_files = [
        (file, gpx_processor.extract_gpx_points(os.path.join(directory_path, file)))
        for file in os.listdir(directory_path) if file.endswith(".gpx")
    ]

    # 추천 경로와 새 경로의 비교
    recommended_path = gpx_processor.extract_gpx_points("C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a2.gpx")
    actual_path = gpx_processor.extract_gpx_points("C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a2.gpx")

    # 실제 경로와 추천 경로 비교
    result = gpx_processor.check_path_completion(recommended_path, actual_path)
    print(f"경로 비교 결과: {result}")

    # 경로 군집화
    path_clusterer = PathClusterer(gpx_processor)
    clustered_paths = path_clusterer.cluster_paths(gpx_files)

    # 묶인 경로 출력
    print("군집화된 경로들:")
    for cluster_id, paths in clustered_paths.items():
        print(f"군집 {cluster_id}: {paths}")
