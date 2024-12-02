import subprocess
import sys
def install_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])
# 필요한 패키지 목록
packages = [
    'lxml',
    'gpxpy',
    'geopy',
    'pandas',
    'scikit-learn',
    'numpy'
]
# 설치 함수 실행
for package in packages:
    install_package(package)
print("필요한 패키지가 설치되었습니다!")
]

# import lxml.etree as etree  # lxml 파서 사용
# import gpxpy
# import pandas as pd
# import numpy as np
# from geopy.distance import geodesic
# from sklearn.neighbors import KDTree
# import ast
# import json

# class GPXProcessor:
#     def __init__(self, toilet_data_path, conv_data_path, trafficlight_data_path):
#         # 데이터 로드
#         self.toilet_data = pd.read_csv(toilet_data_path)
#         self.conv_data = pd.read_csv(conv_data_path)
#         self.trafficlight_data = pd.read_csv(trafficlight_data_path)

#         # K-D 트리 생성 (시설 위치 기준으로)
#         self.toilet_tree = KDTree(self.toilet_data[['latitude', 'longitude']].values)
#         self.conv_tree = KDTree(self.conv_data[['latitude', 'longitude']].values)
#         self.trafficlight_tree = KDTree(self.trafficlight_data[['latitude', 'longitude']].values)

#     def extract_gpx_points(self, file_path):
#         points = []
#         with open(file_path, 'r', encoding='utf-8') as gpx_file:
#             gpx = gpxpy.parse(gpx_file, parser=lxml.etree.XMLParser(recover=True))  # lxml 파서 사용
#             for track in gpx.tracks:
#                 for segment in track.segments:
#                     for point in segment.points:
#                         points.append((point.latitude, point.longitude, point.elevation if point.elevation else 0))
#         return np.array(points)

#     def find_nearest_facilities(self, points, k=1):
#         toilet_counts = []
#         toilet_locations = []
#         store_counts = []
#         store_locations = []
#         trafficlight_counts = []
        
#         # 화장실, 편의점, 신호등에 대해 각 포인트에서 k개의 최근 시설 찾기
#         for point in points:
#             lat, lon = point[0], point[1]
#             toilet_dist, toilet_ind = self.toilet_tree.query([[lat, lon]], k=k)
#             store_dist, store_ind = self.conv_tree.query([[lat, lon]], k=k)
#             trafficlight_dist, trafficlight_ind = self.trafficlight_tree.query([[lat, lon]], k=k)
            
#             toilet_count = len(toilet_ind[0])  # 가장 가까운 k개의 화장실 수
#             store_count = len(store_ind[0])    # 가장 가까운 k개의 편의점 수
#             trafficlight_count = len(trafficlight_ind[0])  # 가장 가까운 k개의 신호등 수

#             toilet_locations.append(self.toilet_data.iloc[toilet_ind[0]]['latitude', 'longitude'].values)
#             store_locations.append(self.conv_data.iloc[store_ind[0]]['latitude', 'longitude'].values)
#             toilet_counts.append(toilet_count)
#             store_counts.append(store_count)
#             trafficlight_counts.append(trafficlight_count)
        
#         return toilet_counts, toilet_locations, store_counts, store_locations, trafficlight_counts

#     def process_gpx_file(self, file_path):
#         points = self.extract_gpx_points(file_path)
#         toilet_counts, toilet_locations, store_counts, store_locations, trafficlight_counts = self.find_nearest_facilities(points)
        
#         # 최종 결과 생성 (시설 관련 추가 정보 포함)
#         result = {
#             'name': file_path.split("/")[-1],
#             'toilet_counts': toilet_counts,
#             'toilet_location': toilet_locations,
#             'store_counts': store_counts,
#             'store_location': store_locations,
#             'trafficlight_counts': trafficlight_counts,
#             'distance_km': np.sum([geodesic((points[i][0], points[i][1]), (points[i+1][0], points[i+1][1])).km for i in range(len(points)-1)]),
#             'Track': points,
#             'Elevation': points[:, 2],
#             'Convenience': np.mean(store_counts),  # 예시로 평균 편의점 수를 편의성으로 설정
#         }
        
#         return result

#     def save_json(self, result, output_path):
#         # JSON으로 저장
#         with open(output_path, 'w', encoding='utf-8') as json_file:
#             json.dump(result, json_file, ensure_ascii=False, indent=4)

#     def convert_coordinates(self, coordinate_str):
#         # 문자열을 리스트로 변환
#         coordinates = ast.literal_eval(coordinate_str)
#         # JSON으로 변환 (latitude, longitude 키 사용)
#         return [{'lat': coord[0], 'lon': coord[1]} for coord in coordinates]

# # 예시 실행 코드
# if __name__ == "__main__":
#     # 경로 설정
#     toilet_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_toilet.csv"
#     conv_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_conv.csv"
#     trafficlight_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_trafficlight.csv"
#     sample_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_d4.gpx"

#     # GPX 파일 처리
#     gpx_processor = GPXProcessor(toilet_data_path, conv_data_path, trafficlight_data_path)
#     result = gpx_processor.process_gpx_file(sample_file)

#     # 결과 출력
#     print(result)
