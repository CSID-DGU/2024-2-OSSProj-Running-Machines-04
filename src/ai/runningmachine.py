#################### Library install ####################
#################### import Library  ####################

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
    if not os.path.exists(directory_path):
        return []

    gpx_files = []
    for file_name in filter(lambda f: f.endswith(".gpx"), os.listdir(directory_path)):
        file_path = os.path.join(directory_path, file_name)
        with open(file_path, 'r', encoding='utf-8') as gpx_file:
            try:
                gpx_data = gpxpy.parse(gpx_file)
                gpx_files.append((file_name, gpx_data))
            except Exception as e:
                print(f"Error in file {file_name}: {e}")
    return gpx_files

# 반경 내 GPX 파일 필터링
def filter_gpx_within_radius(gpx_files, center_coords, radius):
    radius_squared = radius ** 2  # 거리 계산을 제곱으로 비교
    within_radius_files = []

    for file_name, gpx_data in gpx_files:
        for track in gpx_data.tracks:
            for segment in track.segments:
                for point in segment.points:
                    if ((point.latitude - center_coords[0]) ** 2 + (point.longitude - center_coords[1]) ** 2) * 1e6 < radius_squared:
                        within_radius_files.append(file_name)
                        break
                else:
                    continue
                break
            else:
                continue
            break

    return within_radius_files

# 선호도에 따른 필터링
def filter_by_preferences(within_radius_files, elevation, convenience, track):
    elevation_mapping = {"LOW": "Beginner", "MEDIUM": "Advanced", "HIGH": "Expert"}
    convenience_mapping = {
        "LOW": ["No_Facilities", "Essential_Facilities", "Enhanced_Facilities"],
        "MEDIUM": ["Essential_Facilities", "Enhanced_Facilities"],
        "HIGH": ["Enhanced_Facilities"],
    }
    track_mapping = {
        "LOW": "NonTrack",
        "MEDIUM": ["NonTrack", "Track"],
        "HIGH": "Track",
    }

    elevation_pref = elevation_mapping.get(elevation.upper())
    convenience_pref = convenience_mapping.get(convenience.upper(), [])
    track_pref = track_mapping.get(track.upper(), [])

    # 필터링 수행
    return [
        file
        for file in within_radius_files
        if elevation_pref in file and any(c in file for c in convenience_pref) and any(t in file for t in track_pref)
    ]

# 결과 출력 함수
def print_all_and_filtered_files(gpx_files, center_coords, radius, elevation, convenience, track):
    within_radius_files = filter_gpx_within_radius(gpx_files, center_coords, radius)
    print(f"\nWithin {radius / 1000:.2f}km - All paths:")
    print("\n".join(within_radius_files) if within_radius_files else "No files found.")

    filtered_files = filter_by_preferences(within_radius_files, elevation, convenience, track)
    print(f"\nWithin {radius / 1000:.2f}km - Preference paths:")
    print("\n".join(filtered_files) if filtered_files else "No files found matching your preferences.")

# 메인 실행
if __name__ == "__main__":
    # CSV 파일 경로
    toilet_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_toilet.csv' ##### 
    conv_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_conv.csv' #####
    streetlight_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_streetlight.csv' #####
    trafficlight_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_trafficlight.csv' #####

    # CSV 파일 로드
    toilet_data = load_csv(toilet_csv_path)
    conv_data = load_csv(conv_csv_path)
    streetlight_data = load_csv(streetlight_csv_path)
    trafficlight_data = load_csv(trafficlight_csv_path)

    # 데이터 로드 확인
    if toilet_data is not None:
        print("Toilet data loaded.")
    if conv_data is not None:
        print("Convenience store data loaded.")
    if streetlight_data is not None:
        print("Streetlight data loaded.")
    if trafficlight_data is not None:
        print("Trafficlight data loaded.")

    # GPX 파일 디렉토리 및 로드
    gpx_directory = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/gpx" #####
    gpx_files = load_gpx_files(gpx_directory)
    print(f"{len(gpx_files)} GPX files loaded.")

    # 기본 위치 및 반경
    center_coords = (37.511989, 127.091) #####
    radius_threshold = 2500

    # 사용자 입력
    elevation_preference = input("Elevation preference (LOW, MEDIUM, HIGH): ").strip()
    convenience_preference = input("Convenience preference (LOW, MEDIUM, HIGH): ").strip()
    track_preference = input("Track preference (LOW, MEDIUM, HIGH): ").strip()

    # 결과 출력
    print_all_and_filtered_files(
        gpx_files, center_coords, radius_threshold, elevation_preference, convenience_preference, track_preference
    )