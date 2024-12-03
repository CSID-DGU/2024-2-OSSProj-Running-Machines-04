import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import axios from "axios";
import { api } from "@/apis";
import { RouteResponse } from "@/types/routes";
import { Route } from "@/types/kakaoMap";
import useRunningCourseStore from "@/store/useRunningCourseStore";
import useSelectedCourseStore from "@/store/useSelectedCourseStore";

type KakaoMapProps = {
  onClickCourse: (id: number) => void;
};

const KakaoMap = ({ onClickCourse }: KakaoMapProps) => {
  const { setRunningCourse } = useRunningCourseStore();
  const { selectedCourse } = useSelectedCourseStore();

  // 현재 위치(마커) 상태
  const [current, setCurrent] = useState({
    lat: 37.51265,
    lng: 127.0919,
  });

  // 추천 경로 정보 상태
  const [state, setState] = useState({
    center: { lat: 37.51265, lng: 127.0919 }, // 기본 위치 (잠실)
    // center: { lat: 37.5665, lng: 126.978 }, // 기본 위치 (서울 시청)
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
            // 현재 위치 설정
            setCurrent({
              lat: 37.5665,
              lng: 126.978,
              // lat: position.coords.latitude,
              // lng: position.coords.longitude,
            });
            // 요청 경로 정보 설정
            setState((prev) => ({
              ...prev,
              center: {
                lat: 37.5665,
                lng: 126.978,
                // lat: position.coords.latitude,
                // lng: position.coords.longitude,
              },
            }));
            fetchGpxData(current.lat, current.lng);
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
        const response = await api.get<RouteResponse[]>(
          `/course/recommend?lat=${lat}&lon=${lon}`
        );
        const gpxFiles = response.data; // GPX 파일 목록

        // const gpxFiles = dummyRouteData;

        const parsedRoutes: Route[] = await Promise.all(
          gpxFiles.map(async (course) => {
            const response = await axios.get(course.courseUrl); // GPX 데이터 가져오기
            const parser = new DOMParser();
            const xml = parser.parseFromString(
              response.data,
              "application/xml"
            );

            // GPX 데이터에서 <trkpt> 태그 파싱
            const trackPoints = Array.from(xml.getElementsByTagName("trkpt"));

            const path = trackPoints.map((point) => {
              const latAttr = point.attributes.getNamedItem("lat");
              const lonAttr = point.attributes.getNamedItem("lon");

              return {
                lat: parseFloat(latAttr?.textContent || "0"), // lat의 textContent로 접근
                lng: parseFloat(lonAttr?.textContent || "0"), // lon의 textContent로 접근
              };
            });

            return {
              id: course.courseId,
              path,
              name: course.name,
              tag: course.tags,
              distance: course.distance,
            };
          })
        );

        // 성공시
        setState((prev) => ({
          ...prev,
          routes: parsedRoutes,
          isLoading: false,
        }));
      } catch (err) {
        console.log("실패");
        // 실패시
        setState((prev) => ({
          ...prev,
          errMsg: "GPX 데이터를 가져오는 중 오류가 발생했습니다.",
          isLoading: false,
        }));
      }
    };

    getCurrentLocation();
    console.log(state);
  }, [state.isLoading]);

  const handlePolylineClick = (route: Route) => {
    setState((prev) => ({
      ...prev,
      // 폴리라인 시작좌표 이동
      center: { lat: route.path[0].lat, lng: route.path[0].lng },
    }));

    // 선택한 폴리라인 값 업데이트
    onClickCourse(route.id);
    console.log("선택한 코스: ", route);
    console.log("selected state: ", selectedCourse);
    console.log("state: ", state);

    setRunningCourse(route.path);
    // setSel
  };

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
      level={selectedCourse && selectedCourse.courseId !== 0 ? 4 : 7}
    >
      {state.routes.map((route) => (
        <>
          <Polyline
            key={route.id}
            path={route.path}
            strokeWeight={6}
            strokeColor={
              selectedCourse && route.id == selectedCourse.courseId
                ? "#E21919"
                : "#15258E"
            } // 선택된 폴리라인 강조
            strokeOpacity={0.7}
            strokeStyle="solid"
            zIndex={100}
            onClick={() => handlePolylineClick(route)} // 클릭 이벤트 핸들러 추가
          />
        </>
      ))}
      {state.errMsg && <div style={{ color: "red" }}>{state.errMsg}</div>}
      {!state.isLoading && <MapMarker position={current}></MapMarker>}
    </Map>
  );
};

export default KakaoMap;
