# from fastapi import FastAPI
# from pydantic import BaseModel
# import requests
# import gpxpy
# import os

# from runningmachine import print_filtered_files, load_csv

# app = FastAPI()

# toilet_csv_path = 'csv/final_toilet.csv'
# conv_csv_path = 'csv/final_conv.csv'

# toilet_data = load_csv(toilet_csv_path)
# conv_data = load_csv(conv_csv_path)

# # GPX load
# def fetch_gpx_files(base_url):
#     try:
#         response = requests.get(base_url) # 스프링 부트 API에서 GPX URL 리스트 전달 받음
#         response.raise_for_status()  # 요청이 성공적으로 완료되지 않으면 예외 발생
#         gpx_urls = response.json()  # GPX URL 리스트

#         gpx_files = []
#         for url in gpx_urls:
#             try:
#                 file_name = os.path.basename(url) # 파일 이름 추출
#                 gpx_response = requests.get(url) # GPX 파일 다운로드
#                 gpx_response.raise_for_status() # 요청이 성공적으로 완료되지 않으면 예외 발생

#                 gpx_data = gpxpy.parse(gpx_response.text) # GPX 파일 파싱
#                 gpx_files.append((file_name, gpx_data))
#             except Exception as e:
#                 print(f"Error processing {url}: {e}")
#         return gpx_files
#     except Exception as e:
#         return {"error": str(e)}

# # get_gpx_url = "http://localhost:8080/course/getAllCourse"
# get_gpx_url = "http://52.78.82.12:8080/course/getAllCourse"

# # 요청 모델 정의
# class UserInfo(BaseModel):
#     latitude: float
#     longitude: float
#     elevation_preference: str
#     convenience_preference: str
#     track_preference: str

# @app.post("/recommendCourse")
# def process_route(preferences: UserInfo):
#     gpx_files = fetch_gpx_files(get_gpx_url) # 스프링부트 API로 부터 gpx 받아오기

#     center_coords = (preferences.latitude, preferences.longitude) # 사용자 위치 위경도
#     radius_threshold = 2500

#     # 선호도
#     elevation_preference = preferences.elevation_preference.strip()
#     convenience_preference = preferences.convenience_preference.strip()
#     track_preference = preferences.track_preference.strip()

#     # 결과 처리 및 출력
#     result = print_filtered_files(
#         gpx_files, center_coords, radius_threshold, elevation_preference, convenience_preference, track_preference
#     )

#     return result

import sys
import os

# src 디렉터리 경로를 추가
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import os

# 이제 src 폴더가 Python 경로에 포함되어 'runningmachine' 모듈을 불러올 수 있습니다.
from runningmachine import print_filtered_files

app = FastAPI()

# GPX 파일 로드 함수 (lxml 기반)
def fetch_gpx_files(base_url):
    try:
        response = requests.get(base_url)  # 스프링 부트 API에서 GPX URL 리스트 가져오기
        response.raise_for_status()
        gpx_urls = response.json()

        gpx_files = []
        for url in gpx_urls:
            try:
                file_name = os.path.basename(url)
                gpx_response = requests.get(url)
                gpx_response.raise_for_status()
                gpx_data = gpx_response.content  # GPX 데이터 가져오기 (raw XML)
                gpx_files.append((file_name, gpx_data))
            except Exception as e:
                print(f"GPX 파일 처리 중 오류: {url}, 오류: {e}")
        return gpx_files
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"GPX 파일 가져오기 실패: {str(e)}")

# GPX API URL
get_gpx_url = "http://52.78.82.12:8080/course/getAllCourse"

# 요청 모델 정의
class UserInfo(BaseModel):
    latitude: float
    longitude: float
    elevation_preference: str
    convenience_preference: str
    track_preference: str

# 경로 추천 API
@app.post("/recommendCourse")
def recommend_course(preferences: UserInfo):
    try:
        # GPX 파일 로드
        gpx_files = fetch_gpx_files(get_gpx_url)

        if not gpx_files:
            raise HTTPException(status_code=404, detail="GPX 파일을 찾을 수 없습니다.")

        # 사용자 위치 및 반경 설정
        center_coords = (preferences.latitude, preferences.longitude)
        radius_threshold = 2500

        # 사용자 선호도
        elevation_preference = preferences.elevation_preference.strip()
        convenience_preference = preferences.convenience_preference.strip()
        track_preference = preferences.track_preference.strip()

        # 필터링된 추천 경로 반환
        result = print_filtered_files(
            gpx_files, center_coords, radius_threshold,
            elevation_preference, convenience_preference, track_preference
        )
        if not result:
            raise HTTPException(status_code=404, detail="조건에 맞는 경로를 찾을 수 없습니다.")
        return {"recommended_courses": result}
    except HTTPException as e:
        raise e  # FastAPI 에러로 전달
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"서버 오류: {str(e)}")

