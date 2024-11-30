import random
import gpxpy
import folium
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

    def plot_folium_map(self, recommended_path, actual_path, overlap_result):
        """folium을 사용해 경로 겹침 시각화"""
        # 지도 중심은 추천 경로의 첫 번째 점
        center = recommended_path[0]
        map_route = folium.Map(location=center, zoom_start=15)

        # 추천 경로 추가 (파란색)
        folium.PolyLine(recommended_path, color="blue", weight=5, opacity=0.7, tooltip="Recommended Path").add_to(map_route)

        # 실제 경로 추가 (빨간색)
        folium.PolyLine(actual_path, color="red", weight=5, opacity=0.7, tooltip="Actual Path").add_to(map_route)

        # 겹치는 그리드 셀 추가 (초록색)
        for grid_point in overlap_result["overlap_grid"]:
            folium.CircleMarker(
                location=grid_point,
                radius=5,
                color="green",
                fill=True,
                fill_opacity=0.7,
                tooltip="Overlap Point"
            ).add_to(map_route)

        return map_route


if __name__ == "__main__":
    # 원래 경로를 포함한 GPX 파일 경로
    original_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/sample7.gpx"

    # GPX 경로 처리기
    gpx_processor = GPXProcessor(grid_size=0.0005)  # 그리드 크기 약 50m
    original_path = gpx_processor.extract_gpx_points(original_file)

    # 새로운 경로 생성
    modified_path = gpx_processor.modify_route(original_path, lat_range=0.0007, lon_range=0.0007)

    # 경로 겹침 계산
    results = gpx_processor.calculate_overlap(original_path, modified_path)
    print(f"Overlap Ratio: {results['overlap_ratio']:.2f}%")

    # folium 지도 시각화
    map_route = gpx_processor.plot_folium_map(original_path, modified_path, results)
    map_route.save("route_comparison.html")
    print("지도 시각화 결과가 'route_comparison.html'로 저장되었습니다.")
