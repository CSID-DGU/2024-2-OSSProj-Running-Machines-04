import os
import xml.etree.ElementTree as ET
from geopy.distance import geodesic
import numpy as np
import faiss  # faiss 임포트 # pip install faiss-cpu
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import AgglomerativeClustering
from geopy.distance import geodesic

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
        """경로의 총 거리 계산"""
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
    def __init__(self, processor, max_distance_tolerance=20):
        self.processor = processor
        self.max_distance_tolerance = max_distance_tolerance

    def extract_features(self, path):
        """경로에서 위도, 경도를 사용하여 특성 추출"""
        return np.array([point for point in path])  # 경로의 위도, 경도를 벡터로 반환

    def calculate_distance_matrix(self, path_vectors):
        """경로들 간의 거리를 계산하는 함수 (유클리드 거리 또는 지리적 거리)"""
        n = len(path_vectors)
        distance_matrix = np.zeros((n, n))
        for i in range(n):
            for j in range(i + 1, n):
                # 두 경로 간의 평균적인 거리 계산 (각 경로의 첫 번째 점을 기준으로)
                distance_matrix[i][j] = geodesic(path_vectors[i][0], path_vectors[j][0]).meters
                distance_matrix[j][i] = distance_matrix[i][j]
        return distance_matrix

    def cluster_paths(self, paths, threshold=0.8):
        """계층적 군집화 (Hierarchical Clustering)"""
        path_vectors = []

        # 경로 벡터화
        for file, path in paths:
            path_vectors.append(self.extract_features(path))

        # 경로들 간의 거리 행렬 계산 (위도, 경도 간의 거리)
        distance_matrix = self.calculate_distance_matrix(path_vectors)

        # 계층적 군집화 모델 (유사도에 근사한 거리 행렬 사용)
        clustering = AgglomerativeClustering(n_clusters=None, affinity='precomputed', linkage='complete', distance_threshold=threshold)
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
    actual_path = gpx_processor.extract_gpx_points("C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a1.gpx")

    path_completion_processor = GPXProcessorWithDTW(max_distance_tolerance=20)
    print(path_completion_processor.check_path_completion(recommended_path, actual_path))

    # faiss를 사용한 경로 클러스터링
    path_clusterer = PathClusterer(gpx_processor, max_distance_tolerance=20)
    clustered_paths = path_clusterer.cluster_paths(gpx_files)

    print("=== faiss를 사용한 경로 클러스터링 ===")
    if clustered_paths:
        for cluster_id, cluster in clustered_paths.items():
            print(f"Cluster {cluster_id + 1}: {', '.join(cluster)}")
    else:
        print("유사한 경로가 클러스터링되지 않았습니다.")
