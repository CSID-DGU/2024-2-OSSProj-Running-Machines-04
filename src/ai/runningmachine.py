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
from concurrent.futures import ThreadPoolExecutor

# CSV 파일 로드 함수
def load_csv(file_path):
    try:
        if os.path.exists(file_path):
            return pd.read_csv(file_path)
        else:
            print(f"File not found: {file_path}")
            return None
    except Exception as e:
        print(f"Error loading CSV file {file_path}: {e}")
        return None

# GPX 파일 로드 함수 (병렬 처리)
def load_gpx_files(directory_path):
    gpx_files = []
    if not os.path.exists(directory_path):
        print(f"Directory not found: {directory_path}")
        return gpx_files

    def process_file(file_name):
        if file_name.endswith(".gpx"):
            file_path = os.path.join(directory_path, file_name)
            try:
                with open(file_path, 'r', encoding='utf-8') as gpx_file:
                    gpx_data = gpxpy.parse(gpx_file)
                    return (file_name, gpx_data)
            except Exception as e:
                print(f"Error in file {file_name}: {e}")
                return None
        return None

    with ThreadPoolExecutor() as executor:
        results = executor.map(process_file, os.listdir(directory_path))
        gpx_files = [result for result in results if result is not None]

    return gpx_files

# GPX 파일 필터링 함수
def filter_gpx_within_radius_and_preferences(gpx_files, center_coords, radius, elevation, convenience, track, fallback=False):
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

    matching_files = []

    for file_name, gpx_data in gpx_files:
        try:
            if not fallback:
                # 선호도 필터링
                if not (
                    (elevation_pref in file_name) and
                    any(c in file_name for c in convenience_pref) and
                    any(t in file_name for t in track_pref)
                ):
                    continue

            # 반경 체크
            for track in gpx_data.tracks:
                for segment in track.segments:
                    if segment.points:
                        first_point_coords = (segment.points[0].latitude, segment.points[0].longitude)
                        if geodesic(center_coords, first_point_coords).meters > radius:
                            break
                    for point in segment.points:
                        point_coords = (point.latitude, point.longitude)
                        distance = geodesic(center_coords, point_coords).meters
                        if distance <= radius:
                            matching_files.append((file_name, gpx_data, distance))
                            break
                    else:
                        continue
                    break
                else:
                    continue
                break
        except Exception as e:
            print(f"Error processing GPX data in file {file_name}: {e}")

    return matching_files

# 가까운 파일 정렬 및 제한
def sort_and_limit_by_distance(matching_files, limit=5):
    return sorted(matching_files, key=lambda x: x[2])[:limit]

# 결과 출력 함수
def print_filtered_files(gpx_files, center_coords, radius, elevation, convenience, track):
    matching_files = filter_gpx_within_radius_and_preferences(
        gpx_files, center_coords, radius, elevation, convenience, track
    )

    if not matching_files: # 만족되는 게 없을 때
        matching_files = filter_gpx_within_radius_and_preferences(
            gpx_files, center_coords, radius, elevation, convenience, track, fallback=True
        )

    closest_files = sort_and_limit_by_distance(matching_files, limit=5)

    if closest_files:
        for file_name, _, distance in closest_files:
            print(f"{file_name}")
    else:
        print(f"No files found within {radius / 1000:.2f} km.")

# 메인 실행
if __name__ == "__main__":
    toilet_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_toilet.csv'
    conv_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_conv.csv'

    toilet_data = load_csv(toilet_csv_path)
    conv_data = load_csv(conv_csv_path)

    gpx_directory = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/gpx"
    gpx_files = load_gpx_files(gpx_directory)

    center_coords = (37.511989, 127.091)
    radius_threshold = 2500

    elevation_preference = input("Elevation preference (LOW, MEDIUM, HIGH): ").strip()
    convenience_preference = input("Convenience preference (LOW, MEDIUM, HIGH): ").strip()
    track_preference = input("Track preference (LOW, MEDIUM, HIGH): ").strip()

    print_filtered_files(gpx_files, center_coords, radius_threshold, elevation_preference, convenience_preference, track_preference)
