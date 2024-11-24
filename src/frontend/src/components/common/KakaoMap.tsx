import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import axios from "axios";
import { api } from "@/apis";

interface LatLng {
  lat: number;
  lng: number;
}

interface Route {
  id: string;
  path: LatLng[];
}

const KakaoMapWithMultiplePolylines = () => {
  const [state, setState] = useState({
    center: { lat: 37.5665, lng: 126.978 }, // 기본 위치 (서울 시청)
    errMsg: null as string | null,
    isLoading: true,
    routes: [] as Route[], // GPX 경로 데이터를 저장
  });

  useEffect(() => {
    // 현재 위치를 가져오는 함수
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setState((prev) => ({
              ...prev,
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            }));
            fetchGpxData(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            setState((prev) => ({
              ...prev,
              errMsg: err.message,
              isLoading: false,
            }));
          }
        );
      } else {
        setState((prev) => ({
          ...prev,
          errMsg: "geolocation을 사용할 수 없어요.",
          isLoading: false,
        }));
      }
    };

    // 서버에서 GPX 데이터를 가져오는 함수
    const fetchGpxData = async (lat: number, lon: number) => {
      try {
        const response = await api.get(
          `/course/recommend?lat=${lat}&lon=${lon}`
        ); // 서버에서 경로를 받아옴
        const gpxFiles = response.data; // GPX 파일 목록

        const parsedRoutes = await Promise.all(
          gpxFiles.map(async (file: { id: string; url: string }) => {
            const gpxResponse = await axios.get(file.url);
            const parser = new DOMParser();
            const xml = parser.parseFromString(
              gpxResponse.data,
              "application/xml"
            );

            const trackPoints = Array.from(xml.getElementsByTagName("trkpt"));
            const path = trackPoints.map((point) => ({
              lat: parseFloat(point.getAttribute("lat") || "0"),
              lon: parseFloat(point.getAttribute("lon") || "0"),
            }));

            return { id: file.id, path };
          })
        );

        setState((prev) => ({
          ...prev,
          routes: parsedRoutes,
          isLoading: false,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          errMsg: "GPX 데이터를 가져오는 중 오류가 발생했습니다.",
          isLoading: false,
        }));
      }
    };

    getCurrentLocation();
  }, []);

  return (
    <Map
      center={state.center}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
      }}
      level={5}
    >
      {state.routes.map((route) => (
        <Polyline
          key={route.id}
          path={route.path}
          strokeWeight={5} // 폴리라인 두께
          strokeColor="#FF0000" // 폴리라인 색상
          strokeOpacity={0.7} // 폴리라인 투명도
          strokeStyle="solid" // 폴리라인 스타일
        />
      ))}
      {state.errMsg && <div style={{ color: "red" }}>{state.errMsg}</div>}
      {!state.isLoading && <MapMarker position={state.center}></MapMarker>}
    </Map>
  );
};

export default KakaoMapWithMultiplePolylines;
