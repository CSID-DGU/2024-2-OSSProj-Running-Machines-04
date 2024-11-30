import random
import gpxpy
import folium
import webbrowser
import tempfile
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

    def simulate_actual_route(self, recommended_path, missing_rate=0.1, noise=0.0003):
        """추천 경로를 기반으로 실제 GPS 데이터 시뮬레이션"""
        simulated_path = []

        for point in recommended_path:
            # 일부 포인트를 누락 (missing_rate 비율로 누락)
            if random.random() < missing_rate:
                continue

            lat, lon = point
            # 이동 방향에 따라 GPS 노이즈 추가
            lat += random.uniform(-noise, noise)
            lon += random.uniform(-noise, noise)

            simulated_path.append((lat, lon))

        return simulated_path

    def calculate_overlap(self, recommended_path, actual_path):
        """경로 겹침 계산"""
        rec_grid = set(recommended_path)
        act_grid = set(actual_path)

        overlap = rec_grid.intersection(act_grid)  # 겹치는 포인트
        overlap_ratio = len(overlap) / len(rec_grid) * 100  # 겹침 비율 (%)

        return {
            "overlap_ratio": overlap_ratio,
            "overlap_points": overlap
        }

    def create_folium_map(self, recommended_path, actual_path, overlap_result):
        """folium을 사용해 경로 겹침 시각화"""
        # 지도 중심은 추천 경로의 첫 번째 점
        center = recommended_path[0]
        map_route = folium.Map(location=center, zoom_start=15)

        # 추천 경로 추가 (파란색 선)
        folium.PolyLine(recommended_path, color="blue", weight=5, opacity=0.7, tooltip="Recommended Path").add_to(map_route)

        # 실제 경로 추가 (빨간색 선)
        folium.PolyLine(actual_path, color="red", weight=5, opacity=0.7, tooltip="Actual Path").add_to(map_route)

        # 겹치는 포인트 강조 (초록색 원)
        for point in overlap_result["overlap_points"]:
            folium.CircleMarker(
                location=point,
                radius=5,
                color="green",
                fill=True,
                fill_opacity=0.7,
                tooltip="Overlap Point"
            ).add_to(map_route)

        return map_route

    def display_map_in_new_window(self, folium_map):
        """folium 지도를 새 창으로 표시"""
        # 임시 HTML 파일 생성
        with tempfile.NamedTemporaryFile(suffix=".html", delete=False) as temp_file:
            folium_map.save(temp_file.name)  # 지도를 임시 파일로 저장
            webbrowser.open(f"file://{temp_file.name}")  # 새 창으로 HTML 파일 열기


if __name__ == "__main__":
    # 원래 경로를 포함한 GPX 파일 경로
    original_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/sample7.gpx"

    # GPX 경로 처리기
    gpx_processor = GPXProcessor(grid_size=0.0005)  # 그리드 크기 약 50m
    recommended_path = gpx_processor.extract_gpx_points(original_file)

    # 실제 경로 시뮬레이션 (추천 경로 기반)
    actual_path = gpx_processor.simulate_actual_route(recommended_path, missing_rate=0.05, noise=0.0003)

    # 경로 겹침 계산
    results = gpx_processor.calculate_overlap(recommended_path, actual_path)
    print(f"Overlap Ratio: {results['overlap_ratio']:.2f}%")

    # folium 지도 생성
    map_route = gpx_processor.create_folium_map(recommended_path, actual_path, results)

    # 새 창으로 지도 표시
    gpx_processor.display_map_in_new_window(map_route)
