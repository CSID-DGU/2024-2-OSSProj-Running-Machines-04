# import os
# import gpxpy
# import folium
# import webbrowser
# import tempfile
# from geopy.distance import geodesic
# from itertools import combinations


# class GPXProcessor:
#     def __init__(self, max_distance_tolerance=20):
#         self.max_distance_tolerance = max_distance_tolerance  # 거리 비교 허용 오차 (m)

#     def extract_gpx_points(self, file_path):
#         """GPX 파일에서 위도와 경도 추출"""
#         points = []
#         with open(file_path, 'r', encoding='utf-8') as gpx_file:
#             gpx = gpxpy.parse(gpx_file)
#             for track in gpx.tracks:
#                 for segment in track.segments:
#                     for point in segment.points:
#                         points.append((point.latitude, point.longitude))
#         return points

#     def calculate_path_length(self, path):
#         """경로의 총 거리 계산"""
#         total_distance = 0
#         for i in range(1, len(path)):
#             total_distance += geodesic(path[i-1], path[i]).meters
#         return total_distance

#     def calculate_deviation_rate(self, recommended_path, actual_path):
#         """추천 경로와 새 경로 간 이탈률 계산"""
#         total_points = len(recommended_path)
#         if total_points == 0:
#             return 100.0  # 추천 경로가 비어 있으면 완전히 이탈했다고 간주

#         out_of_tolerance_count = 0

#         for rec_point in recommended_path:
#             # 추천 경로의 각 포인트에서 실제 경로와의 최소 거리 계산
#             min_distance = min(geodesic(rec_point, act_point).meters for act_point in actual_path)
#             if min_distance > self.max_distance_tolerance:
#                 out_of_tolerance_count += 1

#         deviation_rate = (out_of_tolerance_count / total_points) * 100
#         return deviation_rate

#     def check_overlap(self, path1, path2):
#         """두 경로가 얼마나 겹치는지 확인 (위도/경도 간 거리 비교)"""
#         overlap_count = 0
#         for point1 in path1:
#             for point2 in path2:
#                 # 두 점 사이의 거리가 tolerance 이하인 경우 겹친다고 판단
#                 if geodesic(point1, point2).meters <= self.max_distance_tolerance:
#                     overlap_count += 1
#         return overlap_count


# ################################## 추천 경로 새 경로 비교 ##################################
# class GPXProcessorWithPathCompletion(GPXProcessor):
#     def __init__(self, max_distance_tolerance=20):
#         super().__init__(max_distance_tolerance)

#     def check_path_completion(self, recommended_path, actual_path):
#         """추천 경로를 따라 뛰었는지 여부 확인"""
#         deviation_rate = self.calculate_deviation_rate(recommended_path, actual_path)
#         recommended_length = self.calculate_path_length(recommended_path)
#         actual_length = self.calculate_path_length(actual_path)

#         if deviation_rate <= 20:
#             if actual_length >= recommended_length:
#                 if all(
#                     min(geodesic(rec_point, act_point).meters for act_point in actual_path) <= self.max_distance_tolerance
#                     for rec_point in recommended_path
#                 ):
#                     return f"Perfect: 추천 경로를 완벽히 따라 뛰었습니다."
#                 else:
#                     return f"Over: 추천 경로를 따라 뛰었고, 추천 경로보다 더 뛰었습니다."
#             else:
#                 return f"Low: 추천 경로를 일부만 뛰었고, 추천 경로보다 덜 뛰었습니다."
#         else:
#             return f"Warning: 경로를 새 경로로 등록해야 합니다. 이탈률: {deviation_rate:.2f}%"


# ################################## 새 경로들 끼리의 클러스터링 ##################################
# class PathClusterer:
#     def __init__(self, processor, overlap_threshold=3):
#         self.processor = processor
#         self.overlap_threshold = overlap_threshold  # 최소 겹치는 포인트 수

#     def find_clusters(self, paths):
#         """
#         경로들 간의 겹침을 계산하여 유사한 경로 3개 이상을 묶어서 클러스터로 처리.
#         """
#         clusters = []
#         checked = set()  # 이미 체크한 경로는 다시 확인하지 않도록

#         # 경로들 간의 겹침 확인
#         for i, (file1, path1) in enumerate(paths):
#             if file1 in checked:
#                 continue
#             current_cluster = [file1]
#             checked.add(file1)

#             for j, (file2, path2) in enumerate(paths):
#                 if file2 in checked or file1 == file2:
#                     continue
#                 overlap_count = self.processor.check_overlap(path1, path2)

#                 # 겹치는 점이 overlap_threshold 이상이면 같은 클러스터에 추가
#                 if overlap_count >= self.overlap_threshold:
#                     current_cluster.append(file2)
#                     checked.add(file2)

#             if len(current_cluster) >= 3:
#                 clusters.append(current_cluster)

#         return clusters


# if __name__ == "__main__":
#     ################################## 추천 경로 새 경로 비교 ##################################
#     # 추천 경로 및 실제 경로 GPX 파일 경로
#     recommended_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a2.gpx"
#     actual_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a3.gpx"

#     # GPX 경로 처리기
#     gpx_processor = GPXProcessorWithPathCompletion(max_distance_tolerance=20)

#     # GPX 파일에서 경로 추출
#     recommended_path = gpx_processor.extract_gpx_points(recommended_file)
#     actual_path = gpx_processor.extract_gpx_points(actual_file)

#     # 경로 상태 및 이탈률 확인
#     result = gpx_processor.check_path_completion(recommended_path, actual_path)
#     print(result)

#     ################################## 새 경로들 끼리의 클러스터링 ##################################
#     # 클러스터링 처리
#     directory_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering"
#     clusterer = PathClusterer(gpx_processor, overlap_threshold=3)

#     # GPX 파일 로드 및 경로 추출
#     gpx_files = [
#         (file, gpx_processor.extract_gpx_points(os.path.join(directory_path, file)))
#         for file in os.listdir(directory_path) if file.endswith(".gpx")
#     ]

#     # 경로들을 비교하여 클러스터 찾기
#     clusters = clusterer.find_clusters(gpx_files)

#     # 클러스터 출력
#     if clusters:
#         for idx, cluster in enumerate(clusters):
#             print(f"Cluster {idx + 1}:")
#             for file in cluster:
#                 print(f"  - {file}")
#     else:
#         print("유사한 경로가 3개 이상 겹치는 클러스터는 없습니다.")


import gpxpy
import folium
import os
import webbrowser

# GPX 파일들이 있는 디렉토리
directory_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering"

# GPX 파일 목록
gpx_files = ["test_off_b1.gpx", "test_off_b2.gpx", "test_off_c1.gpx", "test_off_c2.gpx"]

# 지도 초기화 (중앙 위치를 적당히 설정)
m = folium.Map(location=[37.5665, 126.9780], zoom_start=12)

# 각 GPX 파일을 읽고 경로를 지도에 추가
for gpx_file in gpx_files:
    gpx_file_path = os.path.join(directory_path, gpx_file)
    
    # GPX 파일 읽기 (UTF-8 인코딩으로 열기)
    with open(gpx_file_path, 'r', encoding='utf-8') as f:
        gpx = gpxpy.parse(f)
    
    # 경로 추출
    for track in gpx.tracks:
        for segment in track.segments:
            # 경로의 위도와 경도를 추출
            coordinates = [(point.latitude, point.longitude) for point in segment.points]
            
            # 경로를 지도에 추가
            folium.PolyLine(coordinates, color='blue', weight=3, opacity=0.7).add_to(m)

# HTML 파일로 저장
output_html = os.path.join(directory_path, 'gpx_routes_map.html')
m.save(output_html)

# HTML 파일을 기본 웹 브라우저에서 여는 방법
webbrowser.open(f"file://{output_html}")
