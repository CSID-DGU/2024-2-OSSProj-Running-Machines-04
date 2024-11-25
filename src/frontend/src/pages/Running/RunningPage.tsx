import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { LatLng } from "@/types/kakaoMap";
import useCourseStore from "@/store/useCourseStore";

const RunningPage = () => {
  const { course } = useCourseStore(); // 선택된 코스 URL
  const [current, setCurrent] = useState<LatLng>({
    lat: 37.51265,
    lng: 127.0919,
  }); // 현재 위치
  const [state, setState] = useState<LatLng[]>([]); // 실시간 경로 리스트
  const [selectedCourse, setSelectedCourse] = useState<LatLng[]>([]); // 선택된 코스 경로

  // 실시간 현재 위치 추가
  useEffect(() => {
    const addLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrent(newLocation); // 현재 위치 업데이트
            setState((prevState) => [...prevState, newLocation]); // 실시간 경로 추가
          },
          (error) =>
            console.error("실시간 위치를 받아오지 못하였습니다.", error)
        );
      } else {
        console.error("Geolocation가 지원되지 않습니다.");
      }
    };

    const intervalId = setInterval(addLocation, 5000); // 5초마다 위치 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  return (
    <div>
      <Map
        center={state[state.length - 1] || { lat: 37.51265, lng: 127.0919 }}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
        }}
        level={3}
      >
        {/* 실시간 경로 */}
        <Polyline
          path={state}
          strokeWeight={6}
          strokeColor="#15258E"
          strokeOpacity={0.7}
          strokeStyle="solid"
        />
        {/* 선택한 경로 */}
        {course && (
          <Polyline
            path={course}
            strokeWeight={6}
            strokeColor={"#E21919"}
            strokeOpacity={0.7}
            strokeStyle="solid"
          />
        )}
        <MapMarker position={current} />
      </Map>
    </div>
  );
};

export default RunningPage;
