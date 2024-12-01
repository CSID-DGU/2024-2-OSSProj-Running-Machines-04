import os
import gpxpy
import folium
import webbrowser
import tempfile
from geopy.distance import geodesic
from itertools import combinations


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
            total_distance += geodesic(path[i-1], path[i]).meters
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
                    min(geodesic(rec_point, act_point).meters for act_point in actual_path) <= self.max_distance_tolerance
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
    def __init__(self, processor, similarity_threshold=0.5, deviation_threshold=20):
        self.processor = processor
        self.similarity_threshold = similarity_threshold  # 경로 유사성 임계값
        self.deviation_threshold = deviation_threshold  # 이탈률 기준

    def cluster_paths(self, paths):
        """
        경로들을 이탈률 기준으로 클러스터링.
        이탈률이 임계값 이하인 경로끼리 묶음.
        """
        clusters = []
        for path_a, path_b in combinations(paths, 2):
            # 이탈률 계산
            deviation_rate_a = self.processor.calculate_deviation_rate(path_a[1], path_b[1])

            if deviation_rate_a <= self.deviation_threshold:
                added_to_cluster = False
                for cluster in clusters:
                    if (path_a[0], tuple(path_a[1])) in cluster or (path_b[0], tuple(path_b[1])) in cluster:
                        cluster.add((path_a[0], tuple(path_a[1])))
                        cluster.add((path_b[0], tuple(path_b[1])))
                        added_to_cluster = True
                        break

                if not added_to_cluster:
                    clusters.append(set([(path_a[0], tuple(path_a[1])), (path_b[0], tuple(path_b[1]))]))

        # 3개 이상의 경로로 구성된 클러스터만 반환
        return [cluster for cluster in clusters if len(cluster) >= 3]


if __name__ == "__main__":
    ################################## 추천 경로 새 경로 비교 ##################################
    # 추천 경로 및 실제 경로 GPX 파일 경로
    recommended_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a2.gpx"
    actual_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a3.gpx"

    # GPX 경로 처리기
    gpx_processor = GPXProcessorWithPathCompletion(max_distance_tolerance=20)

    # GPX 파일에서 경로 추출
    recommended_path = gpx_processor.extract_gpx_points(recommended_file)
    actual_path = gpx_processor.extract_gpx_points(actual_file)

    # 경로 상태 및 이탈률 확인
    result = gpx_processor.check_path_completion(recommended_path, actual_path)
    print(result)
    
    ################################## 새 경로들 끼리의 클러스터링 ##################################
    # 클러스터링 처리
    directory_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering"
    clusterer = PathClusterer(gpx_processor, similarity_threshold=0.5, deviation_threshold=20)

    # GPX 파일 로드 및 경로 추출
    gpx_files = [
        (file, gpx_processor.extract_gpx_points(os.path.join(directory_path, file)))
        for file in os.listdir(directory_path) if file.endswith(".gpx")
    ]

    # 클러스터링 수행
    clusters = clusterer.cluster_paths(gpx_files)

    # 클러스터 출력
    for idx, cluster in enumerate(clusters):
        print(f"Cluster {idx + 1}:")
        for path_info in cluster:
            print(f"  - {path_info[0]} (경로 길이: {gpx_processor.calculate_path_length(path_info[1]):.2f} m)")
