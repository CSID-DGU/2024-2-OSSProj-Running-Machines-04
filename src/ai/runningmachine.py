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

## csv file load
def load_csv(file_path):
    if os.path.exists(file_path):
        return pd.read_csv(file_path)
    
## csv
if __name__ == "__main__":
    toilet_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_toilet.csv' ## *** your path ***
    conv_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_conv.csv' ## *** your path ***
    streetlight_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_streetlight.csv' ## *** your path ***
    trafficlight_csv_path = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_trafficlight.csv' ## *** your path ***

    ## csv file load
    toilet_data = load_csv(toilet_csv_path)
    conv_data = load_csv(conv_csv_path)
    streetlight_data = load_csv(streetlight_csv_path)
    trafficlight_data = load_csv(trafficlight_csv_path)

    # csv file load check
    if toilet_data is not None:
        print("final_toilet loaded")
    if conv_data is not None:
        print("final_conv loaded")
    if streetlight_data is not None:
        print("final_streetlight loaded")
    if trafficlight_data is not None:
        print("final_trafficlight loaded")

## gpx file load
def load_gpx_files(directory_path):
    if os.path.exists(directory_path):
        gpx_files = []
        for file_name in os.listdir(directory_path):
            if file_name.endswith(".gpx"):
                file_path = os.path.join(directory_path, file_name)
                with open(file_path, 'r', encoding='utf-8') as gpx_file :  # encoding : UTF-8
                    try:
                        gpx_data = gpxpy.parse(gpx_file)
                        gpx_files.append((file_name, gpx_data))
                    except Exception as e:
                        print(f"error {file_name}, happened : {e}")
        return gpx_files

## gpx directory
gpx_directory = 'C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/gpx' ## *** your path ***

## gpx file load
gpx_files = load_gpx_files(gpx_directory)

## gpx file load check
print(f"{len(gpx_files)} gpx files loaded")
##########################################################

########## base setting 상태에서 경로 추천  ###############
## filtering
from geopy.distance import geodesic
def filter_gpx_within_radius(gpx_files, center_coords, radius):
    within_radius_files = []
    for file_name, gpx_data in gpx_files:
        for track in gpx_data.tracks:
            for segment in track.segments:
                points = segment.points
                if any(geodesic((point.latitude, point.longitude), center_coords).meters < radius for point in points):
                    within_radius_files.append(file_name)
                    break
            else:
                continue
            break
    return within_radius_files

## matching mapping
def filter_by_preferences(within_radius_files, elevation, convenience, track):
    # elevation matching
    elevation_mapping = {
        "LOW": ["Beginner"],
        "MEDIUM": ["Advanced"],
        "HIGH": ["Expert"],
    }
    elevation_categories = elevation_mapping.get(elevation.upper(), [])

    # convenience matching
    convenience_mapping = {
        "LOW": ["Enhanced_Facilities", "Essential_Facilities", "No_Facilities"],
        "MEDIUM": ["Enhanced_Facilities", "Essential_Facilities"],
        "HIGH": ["Essential_Facilities"],
    }
    convenience_categories = convenience_mapping.get(convenience.upper(), [])

    # track shaped matching
    track_categories = ["Track"] if track.upper() == "T" else ["NonTrack", "Track"]

    # filtering
    filtered_files = [
        file
        for file in within_radius_files
        if any(elev in file for elev in elevation_categories)
        and any(conv in file for conv in convenience_categories)
        and any(trk in file for trk in track_categories)
    ]
    return filtered_files


######## base setting 상태에서 모든 경로 추천 #############
######## base setting 상태에서 추천 경로 추천 #############
## all running paths & preference running paths
def print_all_and_filtered_files(gpx_files, center_coords, radius, elevation, convenience, track):
    within_radius_files = filter_gpx_within_radius(gpx_files, center_coords, radius)
    print(f"\nIn {radius / 1000:.2f}km all paths")
    if within_radius_files:
        for file in within_radius_files:
            print(file)
    else:
        print("No files found within the specified radius.")

    # preference filtering
    filtered_files = filter_by_preferences(within_radius_files, elevation, convenience, track)

    # print preference filtering
    print(f"\nIn {radius / 1000:.2f}km preference paths")
    if filtered_files:
        for file in filtered_files:
            print(file)
    else:
        print("No files found within the specified radius matching your preferences.")

## *** My Location ***
center_coords = (37.511989, 127.091)

# radius
radius_threshold = 2500  # 2.5km

## Run
if __name__ == "__main__":
    print("\ncheck my preference")
    ## ***** USER Input *****
    elevation_preference = input("Elevation preference (LOW, MEDIUM, HIGH): ").strip()
    convenience_preference = input("Convenience preference (LOW, MEDIUM, HIGH): ").strip()
    track_preference = input("Track preference (T for Track only, F for both): ").strip()

    # function Run
    print_all_and_filtered_files(
        gpx_files, center_coords, radius_threshold, elevation_preference, convenience_preference, track_preference
    )