#################### Library install ####################
## *********** 한 번 실행하고 각주 처리를 해야함 ***********
# import subprocess
# import sys

# def install_package(package_name):
#     try:
#         subprocess.check_call([sys.executable, "-m", "pip", "install", package_name, "--user"])
#         print(f"'{package_name}' install success")
#     except subprocess.CalledProcessError as e:
#         print(f"'{package_name}' error happened: {e}")

# # install list 
# packages = ["folium", "gpxpy", "geopy"]

# for package in packages:
#     install_package(package)

# # install check
# print("all packages installed")
##########################################################

## gpx 파일들, 가로등, 신호등, 편의점, 화장실 데이터 load ###
## *********** 한 번 실행하고 각주 처리를 해야함 ***********

import os
import gpxpy
import pandas as pd
from geopy.distance import geodesic

# CSV 파일 로드 함수
def load_csv(file_path):
    return pd.read_csv(file_path) if os.path.exists(file_path) else None

# GPX 파일 로드 함수
def load_gpx_files(directory_path):
    gpx_files = []
    if not os.path.exists(directory_path):
        return gpx_files

    # GPX 파일만 찾아서 로드
    for file_name in os.listdir(directory_path):
        if file_name.endswith(".gpx"):
            file_path = os.path.join(directory_path, file_name)
            try:
                with open(file_path, 'r', encoding='utf-8') as gpx_file:
                    gpx_data = gpxpy.parse(gpx_file)
                    gpx_files.append((file_name, gpx_data))
            except Exception as e:
                print(f"Error in file {file_name}: {e}")
    return gpx_files

# 선호도 매핑 및 GPX 파일 필터링
def filter_gpx_within_radius_and_preferences(gpx_files, center_coords, radius, elevation, convenience, track):
    # 선호도 매핑
    elevation_mapping = {"LOW": "Beginner", "MEDIUM": "Advanced", "HIGH": "Expert"}
    convenience_mapping = {
        "LOW": ["No_Facilities", "Essential_Facilities", "Enhanced_Facilities"],
        "MEDIUM": ["Essential_Facilities", "Enhanced_Facilities"],
        "HIGH": ["Enhanced_Facilities"],
    }
    track_mapping = {
        "LOW": ["NonTrack"],  # LOW는 NonTrack만
        "MEDIUM": ["NonTrack", "Track"],  # MEDIUM은 NonTrack, Track
        "HIGH": ["Track"],  # HIGH는 Track만
    }

    # 선호도 설정
    elevation_pref = elevation_mapping.get(elevation.upper())
    convenience_pref = convenience_mapping.get(convenience.upper(), [])
    track_pref = track_mapping.get(track.upper(), [])

    matching_files = []

    # GPX 파일 필터링
    for file_name, gpx_data in gpx_files:
        # 선호도 매핑 필터링
        if not (
            (elevation_pref in file_name) and
            any(c in file_name for c in convenience_pref) and
            any(t in file_name for t in track_pref)
        ):
            continue  # 선호도에 맞지 않으면 건너뛰기

        # GPX 파일 내에서 포인트를 체크하여 반경 내에 있는지 확인
        for track in gpx_data.tracks:
            for segment in track.segments:
                for point in segment.points:
                    point_coords = (point.latitude, point.longitude)
                    distance = geodesic(center_coords, point_coords).meters
                    if distance <= radius:
                        matching_files.append((file_name, gpx_data, distance))  # 거리 추가
                        break  # 반경 내에 있으면 더 이상 탐색할 필요 없음
                else:
                    continue
                break
            else:
                continue
            break

    return matching_files

# 가까운 파일을 거리 기준으로 정렬하고 5개로 제한
def sort_and_limit_by_distance(matching_files, limit=5):
    # 거리 기준으로 정렬 (가장 가까운 것부터)
    matching_files.sort(key=lambda x: x[2])
    
    # 5개로 제한
    return matching_files[:limit]

# 결과 출력 함수
def print_filtered_files(gpx_files, center_coords, radius, elevation, convenience, track):
    # 선호도와 반경에 맞는 파일 필터링
    matching_files = filter_gpx_within_radius_and_preferences(
        gpx_files, center_coords, radius, elevation, convenience, track
    )

    # 5개로 제한
    closest_files = sort_and_limit_by_distance(matching_files, limit=5)

    # 필터링된 파일 출력
    if closest_files:
        # 가장 가까운 5개 경로 출력
        for file_name, _, distance in closest_files:
            print(f"{file_name}")
    else:
        print(f"No files found within {radius / 1000:.2f} km.")

# 메인 실행
if __name__ == "__main__":
    # CSV 파일 경로
    toilet_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_toilet.csv'
    conv_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_conv.csv'

    # CSV 파일 로드
    toilet_data = load_csv(toilet_csv_path)
    conv_data = load_csv(conv_csv_path)

    # GPX 파일 디렉토리 및 로드
    gpx_directory = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/gpx"
    gpx_files = load_gpx_files(gpx_directory)

    # 기본 위치 및 반경
    center_coords = (37.511989, 127.091)
    radius_threshold = 2500  # meters

    # 사용자 입력
    elevation_preference = input("Elevation preference (LOW, MEDIUM, HIGH): ").strip()
    convenience_preference = input("Convenience preference (LOW, MEDIUM, HIGH): ").strip()
    track_preference = input("Track preference (LOW, MEDIUM, HIGH): ").strip()

    # 결과 출력
    print_filtered_files(gpx_files, center_coords, radius_threshold, elevation_preference, convenience_preference, track_preference)