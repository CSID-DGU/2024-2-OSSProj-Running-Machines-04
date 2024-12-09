from fastapi import FastAPI, HTTPException
from lxml import etree
from pydantic import BaseModel
import requests
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from runningmachine import filter_gpx_within_radius_and_preferences, load_gpx_files, print_filtered_files

app = FastAPI()

# GPX 파일 로드 함수
def fetch_gpx_files(base_url):
    try:
        response = requests.get(base_url)  # 스프링 부트 API에서 GPX URL 리스트 가져오기
        response.raise_for_status()
        gpx_urls = response.json()

        gpx_files = []

        def download_and_parse(url):
            file_name = os.path.basename(url)
            gpx_response = requests.get(url)
            gpx_response.raise_for_status()
            gpx_data = gpx_response.content  # GPX 데이터 가져오기
            root = etree.fromstring(gpx_data)  # XML 파싱
            return file_name, root

        # 병렬 다운로드 및 파싱
        with ThreadPoolExecutor() as executor:
            futures = {executor.submit(download_and_parse, url): url for url in gpx_urls}
            for future in as_completed(futures):
                try:
                    gpx_files.append(future.result())
                except Exception as e:
                    print(f"GPX 파일 처리 중 오류: {futures[future]}, 오류: {e}")

        return gpx_files

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"GPX 파일 가져오기 실패: {str(e)}")

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
        gpx_files = fetch_gpx_files("http://52.78.82.12:8080/course/getAllCourse")

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

        return result

    except HTTPException as e:
        raise e  # FastAPI 에러로 전달
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"서버 오류: {str(e)}")
