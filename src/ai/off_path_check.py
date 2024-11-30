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

    def calculate_accuracy(self, recommended_path, actual_path):
        """추천 경로와 실제 경로 간 거리 기반 정확도 계산"""
        matched_points = 0
        for act_point in actual_path:
            # 실제 경로의 각 포인트에서 추천 경로의 가장 가까운 포인트까지 거리 계산
            min_distance = min(geodesic(act_point, rec_point).meters for rec_point in recommended_path)
            if min_distance <= self.max_distance_tolerance:
                matched_points += 1
        accuracy = (matched_points / len(actual_path)) * 100
        return accuracy

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
    recommended_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/서울_강남구_논현동_279-67.gpx"
    actual_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/서울_강남구_신사동_575-1.gpx"

    # GPX 경로 처리기
    gpx_processor = GPXProcessor(sampling_distance=30, max_distance_tolerance=20)

    # GPX 파일에서 경로 추출
    recommended_path = gpx_processor.extract_gpx_points(recommended_file)
    actual_path = gpx_processor.extract_gpx_points(actual_file)

    # 추천 경로 재샘플링
    recommended_path = gpx_processor.resample_path(recommended_path)

    # 정확도 계산
    accuracy = gpx_processor.calculate_accuracy(recommended_path, actual_path)
    print(f"Accuracy: {accuracy:.2f}%")

    # folium 지도 생성
    map_route = gpx_processor.create_folium_map(recommended_path, actual_path)

    # 새 창으로 지도 표시
    gpx_processor.display_map_in_new_window(map_route)


