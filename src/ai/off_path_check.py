# 추천 경로를 따라서 뛰었는지 안 뛰었는지 확인하는 방법

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
    sample_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/sample2.gpx"

    gpx_processor = GPXProcessor()
    gpx_processor.print_gpx_info(sample_file)
