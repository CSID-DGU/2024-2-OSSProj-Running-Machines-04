import os
import gpxpy
from geopy.distance import geodesic
from scipy.spatial import KDTree
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler


class GPXProcessor:
    def __init__(self, max_distance_tolerance=20):
        self.max_distance_tolerance = max_distance_tolerance  # 거리 비교 허용 오차 (m)

    def extract_gpx_points(self, file_path):
        """GPX 파일에서 위도와 경도 추출"""
        points = []
        with open(file_path, 'r', encoding='utf-8') as gpx_file:
            gpx = gpxpy.parse(gpx_file)
            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        points.append((point.latitude, point.longitude))
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


################################## 추천 경로 새 경로 비교 ##################################
class GPXProcessorWithPathCompletion(GPXProcessor):
    def __init__(self, max_distance_tolerance=20):
        super().__init__(max_distance_tolerance)

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
                    return f"Perfect: 추천 경로를 완벽히 따라 뛰었습니다."
                else:
                    return f"Over: 추천 경로를 따라 뛰었고, 추천 경로보다 더 뛰었습니다."
            else:
                return f"Low: 추천 경로를 일부만 뛰었고, 추천 경로보다 덜 뛰었습니다."
        else:
            return f"Warning: 경로를 새 경로로 등록해야 합니다. 이탈률: {deviation_rate:.2f}%"


################################## 새 경로들 끼리의 클러스터링 ##################################
class PathClusterer:
    def __init__(self, processor, overlap_threshold=20):
        self.processor = processor
        self.overlap_threshold = overlap_threshold  # 최소 겹치는 포인트 수

    def find_clusters(self, paths):
        """
        기존 방식: 경로들 간의 겹침을 계산하여 유사한 경로를 묶음.
        """
        clusters = []
        checked = set()  # 이미 체크한 경로는 다시 확인하지 않도록

        # 모든 경로를 KDTree를 활용해 효율적으로 비교
        all_points = []
        path_indices = []
        for idx, (_, path) in enumerate(paths):
            all_points.extend(path)
            path_indices.extend([idx] * len(path))

        tree = KDTree(np.array(all_points))  # KDTree 생성

        # 경로별로 겹치는 포인트를 비교
        for i, (file1, path1) in enumerate(paths):
            if file1 in checked:
                continue

            current_cluster = [file1]
            checked.add(file1)

            for j, (file2, path2) in enumerate(paths):
                if file2 in checked or file1 == file2:
                    continue

                overlap_count = self.count_overlaps(path1, path2, tree)

                if overlap_count >= self.overlap_threshold:
                    current_cluster.append(file2)
                    checked.add(file2)

            if len(current_cluster) >= 3:
                clusters.append(current_cluster)

        return clusters

    def count_overlaps(self, path1, path2, tree):
        """두 경로가 겹치는 점의 수를 KDTree로 계산."""
        overlap_count = 0
        for point in path1:
            distances, indices = tree.query(point, k=1)
            nearest_point = tree.data[indices]
            if geodesic(point, nearest_point).meters <= self.processor.max_distance_tolerance:
                overlap_count += 1

        return overlap_count


################################## 밀도 기반 클러스터링 ##################################
class DensityBasedPathClusterer:
    def __init__(self, processor, epsilon=0.005, min_samples=10):
        """
        DBSCAN 기반 밀도 클러스터링.
        :param processor: GPXProcessor 인스턴스
        :param epsilon: DBSCAN 반경 (약 0.005 radian = 500m)
        :param min_samples: 밀집 판단 기준 포인트 수
        """
        self.processor = processor
        self.epsilon = epsilon
        self.min_samples = min_samples

    def cluster_paths(self, paths):
        """
        경로를 병합하고 DBSCAN으로 밀도 기반 클러스터링 수행.
        :param paths: GPX 경로 데이터 [(file_name, [(lat, lon), ...]), ...]
        :return: 각 클러스터에 속한 파일 이름
        """
        all_points = []
        path_mapping = []
        for idx, (file, path) in enumerate(paths):
            all_points.extend(path)
            path_mapping.extend([idx] * len(path))

        # 위도/경도를 라디안으로 변환
        all_points = np.radians(np.array(all_points))

        # DBSCAN 클러스터링 수행
        db = DBSCAN(eps=self.epsilon, min_samples=self.min_samples, metric="haversine").fit(all_points)
        labels = db.labels_

        # 클러스터링 결과 정리
        clusters = {}
        for label, idx in zip(labels, path_mapping):
            if label == -1:
                continue
            if label not in clusters:
                clusters[label] = set()
            clusters[label].add(paths[idx][0])

        return clusters


if __name__ == "__main__":
    ################################## GPX 데이터 로드 ##################################
    directory_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering"
    gpx_processor = GPXProcessor(max_distance_tolerance=20)

    gpx_files = [
        (file, gpx_processor.extract_gpx_points(os.path.join(directory_path, file)))
        for file in os.listdir(directory_path) if file.endswith(".gpx")
    ]

    ################################## 기존 클러스터링 ##################################
    clusterer = PathClusterer(gpx_processor, overlap_threshold=20)
    clusters = clusterer.find_clusters(gpx_files)

    print("=== 기존 클러스터링 ===")
    if clusters:
        for idx, cluster in enumerate(clusters):
            print(f"Cluster {idx + 1}:")
            for file in cluster:
                print(f"  - {file}")
    else:
        print("유사한 경로가 3개 이상 겹치는 클러스터는 없습니다.")

    ################################## 밀도 기반 클러스터링 ##################################
    density_clusterer = DensityBasedPathClusterer(gpx_processor, epsilon=0.005, min_samples=10)
    density_clusters = density_clusterer.cluster_paths(gpx_files)

    print("\n=== 밀도 기반 클러스터링 ===")
    if density_clusters:
        for cluster_id, files in density_clusters.items():
            print(f"Cluster {cluster_id}:")
            for file in files:
                print(f"  - {file}")
    else:
        print("밀도 기반 클러스터에서 유사한 경로가 발견되지 않았습니다.")
