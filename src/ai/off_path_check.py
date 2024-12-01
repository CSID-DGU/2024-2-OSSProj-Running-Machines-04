##### 추천 코스를 따라 뛰었는지 뛰지 않았는지에 대한 logic #####
import os
import gpxpy
import folium
import webbrowser
import tempfile
from geopy.distance import geodesic

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
        """경로의 총 길이 계산 (m 단위)"""
        total_length = 0
        for i in range(1, len(path)):
            total_length += geodesic(path[i - 1], path[i]).meters
        return total_length

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

    def check_path_completion(self, recommended_path, actual_path):
        """추천 경로를 따라 뛰었는지 여부 확인"""
        deviation_rate = self.calculate_deviation_rate(recommended_path, actual_path)
        recommended_length = self.calculate_path_length(recommended_path)
        actual_length = self.calculate_path_length(actual_path)

        if deviation_rate <= 20 :
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
            return f"Warning : 경로를 새 경로로 등록해야 합니다. 이탈률: {deviation_rate:.2f}%"

    def create_folium_map(self, recommended_path, actual_path):
        """folium을 사용해 경로 시각화"""
        center = recommended_path[0]  # 지도 중심은 추천 경로의 첫 번째 점
        map_route = folium.Map(location=center, zoom_start=15)

        # 추천 경로 추가 (파란색 선)
        folium.PolyLine(recommended_path, color="blue", weight=5, opacity=0.7, tooltip="Recommended Path").add_to(map_route)

        # 실제 경로 추가 (빨간색 선)
        folium.PolyLine(actual_path, color="red", weight=5, opacity=0.7, tooltip="Actual Path").add_to(map_route)

        return map_route

    def display_map_in_new_window(self, folium_map):
        """folium 지도를 새 창으로 표시"""
        with tempfile.NamedTemporaryFile(suffix=".html", delete=False) as temp_file:
            folium_map.save(temp_file.name)  # 지도를 임시 파일로 저장
            webbrowser.open(f"file://{temp_file.name}")  # 새 창으로 HTML 파일 열기


if __name__ == "__main__":
    # 추천 경로 및 실제 경로 GPX 파일 경로
    recommended_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a2.gpx"
    actual_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a3.gpx"

    # GPX 경로 처리기
    gpx_processor = GPXProcessor(max_distance_tolerance=20)

    # GPX 파일에서 경로 추출
    recommended_path = gpx_processor.extract_gpx_points(recommended_file)
    actual_path = gpx_processor.extract_gpx_points(actual_file)

    # 경로 상태 및 이탈률 확인
    result = gpx_processor.check_path_completion(recommended_path, actual_path)
    print(result)

    # # folium 지도 생성
    # map_route = gpx_processor.create_folium_map(recommended_path, actual_path)

    # # 새 창으로 지도 표시
    # gpx_processor.display_map_in_new_window(map_route)

##### 추천 코스가 아닌 경로들(추천 코스에서 이탈한 경로들과, 새로운 경로들) #####
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

    def calculate_similarity(self, path_a, path_b):
        """
        경로 A와 경로 B 간의 유사성 계산.
        점수는 다음 기준에 기반:
        - 공통 비율
        - 평균 거리
        """
        common_points = 0
        total_distance = 0

        for point_a in path_a:
            distances = [geodesic(point_a, point_b).meters for point_b in path_b]
            min_distance = min(distances)

            total_distance += min_distance
            if min_distance <= self.max_distance_tolerance:
                common_points += 1

        common_ratio = common_points / len(path_a)
        average_distance = total_distance / len(path_a)

        # 유사성 점수 계산
        similarity_score = common_ratio * 0.7 - average_distance * 0.3
        return similarity_score

    def create_folium_map(self, paths, center_path=None):
        """folium을 사용해 경로 시각화"""
        if center_path:
            center = center_path[0]  # 지도 중심은 기준 경로의 첫 번째 점
        else:
            center = paths[0][0]  # 경로 중 첫 번째 경로의 첫 번째 점 사용

        map_route = folium.Map(location=center, zoom_start=15)

        # 경로 추가 (색상을 다르게)
        colors = ["blue", "red", "green", "purple", "orange"]
        for idx, path in enumerate(paths):
            folium.PolyLine(path, color=colors[idx % len(colors)], weight=5, opacity=0.7).add_to(map_route)

        return map_route

    def display_map_in_new_window(self, folium_map):
        """folium 지도를 새 창으로 표시"""
        with tempfile.NamedTemporaryFile(suffix=".html", delete=False) as temp_file:
            folium_map.save(temp_file.name)  # 지도를 임시 파일로 저장
            webbrowser.open(f"file://{temp_file.name}")  # 새 창으로 HTML 파일 열기


class PathClusterer:
    def __init__(self, processor, similarity_threshold=0.5):
        self.processor = processor
        self.similarity_threshold = similarity_threshold  # 경로 유사성 임계값

    def cluster_paths(self, paths):
        """
        경로들을 유사성 기준으로 클러스터링.
        3개 이상의 경로가 묶인 클러스터를 반환.
        """
        clusters = []
        path_pairs = list(combinations(paths, 2))

        # 유사한 경로 그룹화
        for path_a, path_b in path_pairs:
            score = self.processor.calculate_similarity(path_a[1], path_b[1])
            if score >= self.similarity_threshold:
                # 기존 클러스터에 추가
                for cluster in clusters:
                    if path_a in cluster or path_b in cluster:
                        cluster.add((path_a[0], tuple(path_a[1])))
                        cluster.add((path_b[0], tuple(path_b[1])))
                        break
                else:
                    # 새로운 클러스터 생성
                    clusters.append(set([(path_a[0], tuple(path_a[1])), (path_b[0], tuple(path_b[1]))]))

        # 3개 이상의 경로로 구성된 클러스터만 반환
        return [cluster for cluster in clusters if len(cluster) >= 3]


if __name__ == "__main__":
    directory_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering"
    processor = GPXProcessor(max_distance_tolerance=20)
    clusterer = PathClusterer(processor, similarity_threshold=0.5)

    # GPX 파일 로드 및 경로 추출
    gpx_files = [
        (file, processor.extract_gpx_points(os.path.join(directory_path, file)))
        for file in os.listdir(directory_path)
        if file.endswith(".gpx")
    ]

    # 클러스터링 실행
    clusters = clusterer.cluster_paths(gpx_files)

    # 결과 출력 및 지도 표시
    for idx, cluster in enumerate(clusters):
        print(f"Cluster {idx + 1}:")
        for file, _ in cluster:
            print(f"  - {file}")

        # 지도에 클러스터 경로 표시
        paths = [list(path[1]) for path in cluster]
        folium_map = processor.create_folium_map(paths)
        processor.display_map_in_new_window(folium_map)