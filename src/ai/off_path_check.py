import gpxpy
import folium
import webbrowser
import tempfile
from geopy.distance import geodesic


class GPXProcessor:
    def __init__(self, sampling_distance=30, max_distance_tolerance=20):
        self.sampling_distance = sampling_distance  # 샘플링 거리 (m)
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

    def resample_path(self, path):
        """추천 경로를 일정 간격으로 재샘플링"""
        resampled_path = [path[0]]  # 첫 포인트는 포함
        for i in range(1, len(path)):
            last_point = resampled_path[-1]
            while geodesic(last_point, path[i]).meters > self.sampling_distance:
                # 일정 거리 간격으로 포인트 추가
                lat_diff = path[i][0] - last_point[0]
                lon_diff = path[i][1] - last_point[1]
                lat_step = lat_diff * (self.sampling_distance / geodesic(last_point, path[i]).meters)
                lon_step = lon_diff * (self.sampling_distance / geodesic(last_point, path[i]).meters)
                new_point = (last_point[0] + lat_step, last_point[1] + lon_step)
                resampled_path.append(new_point)
                last_point = new_point
        return resampled_path

    def is_path_contained(self, smaller_path, larger_path):
        """smaller_path가 larger_path에 포함되는지 확인"""
        for small_point in smaller_path:
            min_distance = min(geodesic(small_point, large_point).meters for large_point in larger_path)
            if min_distance > self.max_distance_tolerance:
                return False
        return True

    def calculate_deviation_rate(self, recommended_path, actual_path):
        """추천 경로와 실제 경로 간 이탈률 계산"""
        total_deviation = 0
        for rec_point in recommended_path:
            # 추천 경로의 각 포인트가 실제 경로와 얼마나 멀리 떨어졌는지 확인
            min_distance = min(geodesic(rec_point, act_point).meters for act_point in actual_path)
            if min_distance > self.max_distance_tolerance:
                total_deviation += 1
        deviation_rate = (total_deviation / len(recommended_path)) * 100
        return deviation_rate

    def check_path_completion(self, recommended_path, actual_path):
        """추천 경로를 따라 뛰었는지 여부 확인"""
        if self.is_path_contained(actual_path, recommended_path):
            return "추천 경로를 덜 뛰었지만 포함되었습니다."
        elif self.is_path_contained(recommended_path, actual_path):
            return "추천 경로를 뛰었으며 추가 구간도 포함되었습니다."
        else:
            # 이탈률 계산
            deviation_rate = self.calculate_deviation_rate(recommended_path, actual_path)
            if deviation_rate <= 20:
                return f"추천 경로와 비슷하게 뛰었으나 일부 이탈 (이탈률: {deviation_rate:.2f}%)."
            else:
                return f"추천 경로에서 크게 이탈했습니다 (이탈률: {deviation_rate:.2f}%)."

    def create_folium_map(self, recommended_path, actual_path):
        """folium을 사용해 경로 시각화"""
        # 지도 중심은 추천 경로의 첫 번째 점
        center = recommended_path[0]
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
    gpx_processor = GPXProcessor(sampling_distance=30, max_distance_tolerance=20)

    # GPX 파일에서 경로 추출
    recommended_path = gpx_processor.extract_gpx_points(recommended_file)
    actual_path = gpx_processor.extract_gpx_points(actual_file)

    # 추천 경로 재샘플링
    recommended_path = gpx_processor.resample_path(recommended_path)

    # 경로 포함 여부 및 이탈률 확인
    result = gpx_processor.check_path_completion(recommended_path, actual_path)
    print(result)

    # folium 지도 생성
    map_route = gpx_processor.create_folium_map(recommended_path, actual_path)

    # 새 창으로 지도 표시
    gpx_processor.display_map_in_new_window(map_route)
