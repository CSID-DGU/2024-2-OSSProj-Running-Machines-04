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
import gpxpy
import matplotlib.pyplot as plt
from geopy.distance import geodesic


class GPXProcessor:
    def __init__(self, grid_size=0.0005):
        self.grid_size = grid_size  # 그리드 크기 (위도/경도 단위)

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

    def modify_route(self, original_path, lat_range=0.001, lon_range=0.001):
        """원래 경로를 기반으로 새로운 경로 생성"""
        modified_path = []
        for lat, lon in original_path:
            # 위도와 경도에 무작위 오차 추가
            lat += random.uniform(-lat_range, lat_range)
            lon += random.uniform(-lon_range, lon_range)
            modified_path.append((lat, lon))
        return modified_path

    def generate_grid(self, path):
        """경로를 그리드로 변환"""
        grid = set()
        for lat, lon in path:
            grid_lat = round(lat / self.grid_size) * self.grid_size
            grid_lon = round(lon / self.grid_size) * self.grid_size
            grid.add((grid_lat, grid_lon))
        return grid

    def calculate_overlap(self, recommended_path, actual_path):
        """경로 겹침 계산"""
        rec_grid = self.generate_grid(recommended_path)
        act_grid = self.generate_grid(actual_path)

        overlap = rec_grid.intersection(act_grid)  # 겹치는 그리드 셀
        overlap_ratio = len(overlap) / len(rec_grid) * 100  # 겹침 비율 (%)

        return {
            "overlap_ratio": overlap_ratio,
            "recommended_grid": rec_grid,
            "actual_grid": act_grid,
            "overlap_grid": overlap
        }

    def plot_overlap(self, recommended_path, actual_path, overlap_result):
        """경로 겹침 시각화"""
        rec_lat, rec_lon = zip(*recommended_path)
        act_lat, act_lon = zip(*actual_path)
        overlap_lat, overlap_lon = zip(*overlap_result["overlap_grid"])

        plt.figure(figsize=(10, 8))
        plt.plot(rec_lon, rec_lat, label="Recommended Path", color="blue", linewidth=2)
        plt.plot(act_lon, act_lat, label="Actual Path", color="red", linestyle="--", linewidth=2)

        # 겹치는 그리드 셀 표시
        plt.scatter(overlap_lon, overlap_lat, color="green", label="Overlap", s=50, alpha=0.6)

        plt.xlabel("Longitude")
        plt.ylabel("Latitude")
        plt.title("Path Overlap Visualization")
        plt.legend()
        plt.grid(True)
        plt.show()


if __name__ == "__main__":
    # 원래 경로를 포함한 GPX 파일 경로
    original_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/sample7.gpx"

    # GPX 경로 처리기
    gpx_processor = GPXProcessor(grid_size=0.0005)  # 그리드 크기 약 50m
    original_path = gpx_processor.extract_gpx_points(original_file)

    # 새로운 경로 생성 (원 경로를 수정)
    modified_path = gpx_processor.modify_route(original_path, lat_range=0.0007, lon_range=0.0007)

    # 경로 겹침 계산
    results = gpx_processor.calculate_overlap(original_path, modified_path)
    print(f"Overlap Ratio: {results['overlap_ratio']:.2f}%")

    # 겹침 시각화
    gpx_processor.plot_overlap(original_path, modified_path, results)  
    
    ###
    
    

