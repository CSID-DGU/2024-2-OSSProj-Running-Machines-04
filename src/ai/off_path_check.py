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

    def is_path_contained(self, smaller_path, larger_path):
        """smaller_path가 larger_path에 포함되는지 확인"""
        for small_point in smaller_path:
            min_distance = min(geodesic(small_point, large_point).meters for large_point in larger_path)
            if min_distance > self.max_distance_tolerance:
                return False
        return True

    def calculate_overlap_ratio(self, recommended_path, actual_path):
        """추천 경로와 새 경로 간 포함 비율 계산 (%)"""
        included_points = 0
        for rec_point in recommended_path:
            min_distance = min(geodesic(rec_point, act_point).meters for act_point in actual_path)
            if min_distance <= self.max_distance_tolerance:
                included_points += 1
        overlap_ratio = (included_points / len(recommended_path)) * 100
        return overlap_ratio

    def check_path_completion(self, recommended_path, actual_path):
        """추천 경로를 따라 뛰었는지 여부 확인"""
        recommended_length = self.calculate_path_length(recommended_path)
        actual_length = self.calculate_path_length(actual_path)

        # 추천 경로가 새 경로에 완전히 포함되는지 확인
        if self.is_path_contained(recommended_path, actual_path):
            if actual_length > recommended_length:
                return f"over: 추천 경로를 뛰었으며 추가 구간도 포함되었습니다. (추천 길이: {recommended_length:.2f}m, 실제 길이: {actual_length:.2f}m)"
            else:
                return f"perfect: 추천 경로를 완벽히 따랐습니다. (추천 길이: {recommended_length:.2f}m, 실제 길이: {actual_length:.2f}m)"
        else:
            overlap_ratio = self.calculate_overlap_ratio(recommended_path, actual_path)
            return f"low: 추천 경로를 일부만 따랐습니다. 포함 비율: {overlap_ratio:.2f}%"

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
    recommended_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/서울_성동구_옥수동_250.gpx"
    actual_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/서울_성동구_옥수동_560.gpx"

    # GPX 경로 처리기
    gpx_processor = GPXProcessor(max_distance_tolerance=20)

    # GPX 파일에서 경로 추출
    recommended_path = gpx_processor.extract_gpx_points(recommended_file)
    actual_path = gpx_processor.extract_gpx_points(actual_file)

    # 경로 포함 여부 및 상태 확인
    result = gpx_processor.check_path_completion(recommended_path, actual_path)
    print(result)

    # folium 지도 생성
    map_route = gpx_processor.create_folium_map(recommended_path, actual_path)

    # 새 창으로 지도 표시
    gpx_processor.display_map_in_new_window(map_route)
