import os
from lxml import etree
import pandas as pd
from math import radians, sin, cos, sqrt, atan2
from concurrent.futures import ThreadPoolExecutor, as_completed

# 거리 계산 함수 (Haversine Formula)
def haversine_distance(coord1, coord2):
    R = 6371e3  # 지구 반지름 (미터)
    lat1, lon1 = radians(coord1[0]), radians(coord1[1])
    lat2, lon2 = radians(coord2[0]), radians(coord2[1])

    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

# GPX 파일 로드 함수 (lxml 사용)
def load_gpx_files(directory_path):
    gpx_files = []
    if not os.path.exists(directory_path):
        return gpx_files

    def process_file(file_name):
        file_path = os.path.join(directory_path, file_name)
        if file_name.endswith(".gpx"):
            try:
                with open(file_path, 'rb') as gpx_file:
                    tree = etree.parse(gpx_file)
                    return (file_name, tree)
            except Exception as e:
                print(f"Error parsing GPX file {file_name}: {e}")
        return None

    with ThreadPoolExecutor() as executor:
        results = executor.map(process_file, os.listdir(directory_path))
        gpx_files = [result for result in results if result is not None]

    return gpx_files

# GPX 파일 필터링 함수
def filter_gpx_within_radius_and_preferences(gpx_files, center_coords, radius, elevation, convenience, track):
    elevation_mapping = {"LOW": "Beginner", "MEDIUM": "Advanced", "HIGH": "Expert"}
    convenience_mapping = {
        "LOW": ["No_Facilities", "Essential_Facilities", "Enhanced_Facilities"],
        "MEDIUM": ["Essential_Facilities", "Enhanced_Facilities"],
        "HIGH": ["Enhanced_Facilities"],
    }
    track_mapping = {
        "LOW": ["NonTrack"],
        "MEDIUM": ["NonTrack", "Track"],
        "HIGH": ["Track"],
    }

    elevation_pref = elevation_mapping.get(elevation.upper())
    convenience_pref = convenience_mapping.get(convenience.upper(), [])
    track_pref = track_mapping.get(track.upper(), [])

    def is_within_radius_and_preferences(file_name, tree):
        namespace = {"ns": "http://www.topografix.com/GPX/1/1"}
        first_point = tree.xpath("//ns:trkpt[1]", namespaces=namespace)
        if not first_point:
            return None

        lat = float(first_point[0].get("lat"))
        lon = float(first_point[0].get("lon"))
        distance = haversine_distance(center_coords, (lat, lon))
        if distance > radius:
            return None

        if (
            elevation_pref in file_name and
            any(c in file_name for c in convenience_pref) and
            any(t in file_name for t in track_pref)
        ):
            return (file_name, tree, distance)

        return None

    matching_files = []

    with ThreadPoolExecutor() as executor:
        futures = [
            executor.submit(is_within_radius_and_preferences, file_name, tree)
            for file_name, tree in gpx_files
        ]
        for future in as_completed(futures):
            result = future.result()
            if result:
                matching_files.append(result)

    return matching_files

# 가까운 파일 정렬 및 상위 5개 제한
def sort_and_limit_by_distance(matching_files, limit=5):
    return sorted(matching_files, key=lambda x: x[2])[:limit]

# 부족한 결과를 가장 가까운 파일로 채우기
def fill_closest_files(gpx_files, center_coords, limit=5):
    def calculate_distance(file_data):
        file_name, tree = file_data[:2]
        namespace = {"ns": "http://www.topografix.com/GPX/1/1"}
        first_point = tree.xpath("//ns:trkpt[1]", namespaces=namespace)
        if not first_point:
            return float("inf")
        lat = float(first_point[0].get("lat"))
        lon = float(first_point[0].get("lon"))
        return haversine_distance(center_coords, (lat, lon))

    # 모든 파일에 대해 거리 계산
    closest_files = [
        (file_name, tree, calculate_distance((file_name, tree)))
        for file_name, tree in gpx_files
    ]
    # 거리 기준으로 정렬
    return sorted(closest_files, key=lambda x: x[2])[:limit]

# 결과 출력 함수
def print_filtered_files(gpx_files, center_coords, radius, elevation, convenience, track):
    # 조건에 맞는 파일 필터링
    matching_files = filter_gpx_within_radius_and_preferences(
        gpx_files, center_coords, radius, elevation, convenience, track
    )

    if len(matching_files) < 5:
        closest_files = fill_closest_files(gpx_files, center_coords, limit=5)
    else:
        closest_files = sort_and_limit_by_distance(matching_files, limit=5)

    # 출력
    if closest_files:
        for i, (file_name, _, distance) in enumerate(closest_files, start=1):
            print(f"{i}. {file_name}")

# 메인 실행
if __name__ == "__main__":
    # GPX 파일 로드
    gpx_directory = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/gpx"
    gpx_files = load_gpx_files(gpx_directory)

    # 필터링 설정
    center_coords = (37.511989, 127.091)
    radius_threshold = 2500

    elevation_preference = input("Elevation preference (LOW, MEDIUM, HIGH): ").strip()
    convenience_preference = input("Convenience preference (LOW, MEDIUM, HIGH): ").strip()
    track_preference = input("Track preference (LOW, MEDIUM, HIGH): ").strip()

    # 결과 출력
    print_filtered_files(
        gpx_files, center_coords, radius_threshold, elevation_preference, convenience_preference, track_preference
    )