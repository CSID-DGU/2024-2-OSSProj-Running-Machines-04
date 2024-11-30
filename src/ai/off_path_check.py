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

        if deviation_rate <= 20:
            if actual_length >= recommended_length:
                if all(
                    min(geodesic(rec_point, act_point).meters for act_point in actual_path) <= self.max_distance_tolerance
                    for rec_point in recommended_path
                ):
                    return f"perfect: 추천 경로를 완벽히 따라 뛰었습니다. 이탈률: {deviation_rate:.2f}%"
                else:
                    return f"over: 추천 경로를 뛰었으며 추가 구간도 포함되었습니다. 이탈률: {deviation_rate:.2f}%"
            else:
                return f"low: 추천 경로를 일부만 뛰었습니다. 이탈률: {deviation_rate:.2f}%, 추천 경로 대비 짧은 거리."
        else:
            return f"경로를 새 경로로 등록해야 합니다. 이탈률: {deviation_rate:.2f}%"

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
    recommended_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/서울_서대문구_북아현동_251-46.gpx"
    actual_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/서울_서대문구_대현동_45-51.gpx"

    # GPX 경로 처리기
    gpx_processor = GPXProcessor(max_distance_tolerance=20)

    # GPX 파일에서 경로 추출
    recommended_path = gpx_processor.extract_gpx_points(recommended_file)
    actual_path = gpx_processor.extract_gpx_points(actual_file)

    # 경로 상태 및 이탈률 확인
    result = gpx_processor.check_path_completion(recommended_path, actual_path)
    print(result)

    # folium 지도 생성
    map_route = gpx_processor.create_folium_map(recommended_path, actual_path)

    # 새 창으로 지도 표시
    gpx_processor.display_map_in_new_window(map_route)
