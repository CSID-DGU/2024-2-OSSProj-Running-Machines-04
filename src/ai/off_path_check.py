# 추천 경로를 따라서 뛰었는지 안 뛰었는지 확인하는 방법

'''
import gpxpy

class GPXProcessor:
    def __init__(self):
        pass

    # GPX 파일에서 포인트 추출
    def extract_gpx_points(self, file_path):
        points = []
        with open(file_path, 'r', encoding='utf-8') as gpx_file:
            gpx = gpxpy.parse(gpx_file)
            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        # (위도, 경도, 고도) 튜플로 포인트 추가
                        points.append((point.latitude, point.longitude, point.elevation))
        return points

    # GPX 파일 정보 출력
    def print_gpx_info(self, file_path):
        points = self.extract_gpx_points(file_path)
        for i, point in enumerate(points):
            print(f"Point {i+1}: Latitude = {point[0]}, Longitude = {point[1]}, Elevation = {point[2]}")

if __name__ == "__main__":
    sample_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/sample3.gpx"

    gpx_processor = GPXProcessor()
    gpx_processor.print_gpx_info(sample_file)
'''

import random
import math
import matplotlib.pyplot as plt
import gpxpy

class GPXProcessor:
    def __init__(self):
        pass

    # GPX 파일에서 포인트 추출
    def extract_gpx_points(self, file_path):
        points = []
        with open(file_path, 'r', encoding='utf-8') as gpx_file:
            gpx = gpxpy.parse(gpx_file)
            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        # (위도, 경도) 튜플로 포인트 추가 (고도 제외)
                        points.append((point.latitude, point.longitude))
        return points

    # 경로 일부 수정 (더 구체적인 수정)
    def modify_route(self, original_path):
        modified_path = original_path[:]
        
        # 경로 중 3번째부터 6번째 포인트 수정
        for i in range(2, 6):
            if i < len(modified_path):
                lat, lon = modified_path[i]

                # 더 큰 오차 범위로 수정
                lat_change = random.uniform(-0.001, 0.001)  # 위도 변화 범위 (약 ±100m)
                lon_change = random.uniform(-0.001, 0.001)  # 경도 변화 범위 (약 ±100m)

                # 수정된 포인트 업데이트
                modified_path[i] = (lat + lat_change, lon + lon_change)
                
        return modified_path

    # 위도와 경도로 거리 계산 (단위: 미터)
    def calculate_distance(self, point1, point2):
        lat1, lon1 = point1
        lat2, lon2 = point2
        # 위도, 경도 차이를 라디안으로 변환 후 거리 계산
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return 6371000 * c  # 지구 반지름 6371km (미터 단위)

    # 경로 이탈률 계산
    def calculate_deviation_rate(self, original_path, modified_path):
        if len(original_path) != len(modified_path):
            raise ValueError("Original path and modified path must have the same number of points.")
        
        total_original_distance = 0
        total_deviation = 0

        # 원 경로의 전체 길이 계산
        for i in range(1, len(original_path)):
            total_original_distance += self.calculate_distance(original_path[i - 1], original_path[i])

        # 원 경로와 수정 경로의 거리 차이 계산
        for o_point, m_point in zip(original_path, modified_path):
            total_deviation += self.calculate_distance(o_point, m_point)

        # 이탈률 계산
        if total_original_distance == 0:
            return 0
        return total_deviation / total_original_distance

    # GPX 경로 시각화
    def plot_paths(self, original_path, modified_path):
        original_latitudes, original_longitudes = zip(*original_path)
        modified_latitudes, modified_longitudes = zip(*modified_path)

        plt.figure(figsize=(8, 6))
        plt.plot(original_longitudes, original_latitudes, label='Original Path', color='blue', linewidth=2)
        plt.plot(modified_longitudes, modified_latitudes, label='Modified Path', color='red', linestyle='--', linewidth=2)
        
        # 각 이탈 지점 표시
        for o_point, m_point in zip(original_path, modified_path):
            plt.scatter(m_point[1], m_point[0], color='black', s=10)  # 수정된 포인트 표시
        
        plt.xlabel('Longitude')
        plt.ylabel('Latitude')
        plt.title('Original and Modified Paths')
        plt.legend()
        plt.grid(True)
        plt.show()

if __name__ == "__main__":
    # 예시 GPX 파일 경로
    original_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/sample7.gpx"
    
    # GPX 파일에서 원 경로 추출
    gpx_processor = GPXProcessor()
    original_path = gpx_processor.extract_gpx_points(original_file)

    # 경로 수정 (예시: 일부 경로 수정)
    modified_path = gpx_processor.modify_route(original_path)

    # 경로 이탈률 계산
    deviation_rate = gpx_processor.calculate_deviation_rate(original_path, modified_path)
    print(f"경로 이탈률: {deviation_rate * 100:.2f}%")

    # 경로 시각화
    gpx_processor.plot_paths(original_path, modified_path)
