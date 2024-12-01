from fastapi import FastAPI
from pydantic import BaseModel
import requests
import gpxpy
import os

from runningmachine import print_filtered_files, load_csv

app = FastAPI()

toilet_csv_path = 'csv/final_toilet.csv'
conv_csv_path = 'csv/final_conv.csv'

toilet_data = load_csv(toilet_csv_path)
conv_data = load_csv(conv_csv_path)

# GPX load
def fetch_gpx_files(base_url):
    try:
        response = requests.get(base_url) # 스프링 부트 API에서 GPX URL 리스트 전달 받음
        response.raise_for_status()  # 요청이 성공적으로 완료되지 않으면 예외 발생
        gpx_urls = response.json()  # GPX URL 리스트

        gpx_files = []
        for url in gpx_urls:
            try:
                file_name = os.path.basename(url) # 파일 이름 추출
                gpx_response = requests.get(url) # GPX 파일 다운로드
                gpx_response.raise_for_status() # 요청이 성공적으로 완료되지 않으면 예외 발생

                gpx_data = gpxpy.parse(gpx_response.text) # GPX 파일 파싱
                gpx_files.append((file_name, gpx_data))
            except Exception as e:
                print(f"Error processing {url}: {e}")
        return gpx_files
    except Exception as e:
        return {"error": str(e)}

# get_gpx_url = "http://localhost:8080/course/getAllCourse"
get_gpx_url = "http://52.78.82.12:8080/course/getAllCourse"

# 요청 모델 정의
class UserInfo(BaseModel):
    latitude: float
    longitude: float
    elevation_preference: str
    convenience_preference: str
    track_preference: str

@app.post("/recommendCourse")
def process_route(preferences: UserInfo):
    gpx_files = fetch_gpx_files(get_gpx_url) # 스프링부트 API로 부터 gpx 받아오기

    center_coords = (preferences.latitude, preferences.longitude) # 사용자 위치 위경도
    radius_threshold = 2500

    # 선호도
    elevation_preference = preferences.elevation_preference.strip()
    convenience_preference = preferences.convenience_preference.strip()
    track_preference = preferences.track_preference.strip()

    # 결과 처리 및 출력
    result = print_filtered_files(
        gpx_files, center_coords, radius_threshold, elevation_preference, convenience_preference, track_preference
    )

    return result