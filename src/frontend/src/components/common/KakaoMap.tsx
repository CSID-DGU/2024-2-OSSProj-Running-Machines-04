import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701, // 초기 위치 설정 (임의의 위치)
      lng: 126.570667,
    },
    errMsg: null as string | null, // string | null 타입으로 지정
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 현재 위치를 얻습니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: 37.5665, // 임의의 위치(발표용)
              lng: 126.978, // 임의의 위치(발표용)
              // lat: position.coords.latitude, // 위도
              // lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message, // 오류 메시지 설정
            isLoading: false,
          }));
        }
      );
    } else {
      // GeoLocation을 사용할 수 없는 경우 처리
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할 수 없어요.",
        isLoading: false,
      }));
    }
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
      level={3}
    >
      {!state.isLoading && <MapMarker position={state.center}></MapMarker>}
    </Map>
  );
};

export default KakaoMap;
