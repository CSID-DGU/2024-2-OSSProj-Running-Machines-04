import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import axios from "axios";
import { Route } from "@/types/kakaoMap";
import useRunningCourseStore from "@/store/useRunningCourseStore";
import useSelectedCourseStore from "@/store/useSelectedCourseStore";
import useCourseStore from "@/store/useCourseStore";
import useKakaomapStore from "@/store/useKakaomapStore";
import useParsedCourseStore from "@/store/useParsedCourse";

type KakaoMapProps = {
  onClickCourse: (id: number) => void;
  openSheet: boolean;
};

const KakaoMap = ({ onClickCourse, openSheet }: KakaoMapProps) => {
  const { setRunningCourse } = useRunningCourseStore();
  const { selectedCourse } = useSelectedCourseStore();
  const { course } = useCourseStore();
  const { kakaomapState, setKakaomapState } = useKakaomapStore();
  const { setParsedCourse } = useParsedCourseStore();

  console.log("course: ", course);

  // 현재 위치(마커) 상태
  const [current, setCurrent] = useState({
    lat: 37.51265,
    lng: 127.0919,
  });

  useEffect(() => {
    // 현재 위치를 가져오는 함수
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // 현재 위치 설정
            setCurrent({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setKakaomapState({
              ...useKakaomapStore.getState().kakaomapState, // 현재 상태 가져오기
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });

            fetchGpxData();
          },
          (err) => {
            setKakaomapState({
              ...useKakaomapStore.getState().kakaomapState, // 현재 상태 가져오기
              errMsg: err.message,
              isLoading: false,
            });
          }
        );
      } else {
        setKakaomapState({
          ...useKakaomapStore.getState().kakaomapState, // 현재 상태 가져오기
          errMsg: "geolocation을 사용할 수 없어요.",
          isLoading: false,
        });
      }
    };

    // 서버 데이터의 GPX 데이터를 파싱하는 함수
    const fetchGpxData = async () => {
      try {
        const gpxFiles = course; // 서버로부터 받은 GPX 파일 목록
        console.log("gpxFiles", gpxFiles);

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
        setParsedCourse(parsedRoutes);
        setKakaomapState({
          ...useKakaomapStore.getState().kakaomapState,
          routes: parsedRoutes,
          isLoading: false,
        });
      } catch (err) {
        console.log("실패");
        // 실패시
        setKakaomapState({
          ...useKakaomapStore.getState().kakaomapState,
          errMsg: "GPX 데이터를 가져오는 중 오류가 발생했습니다.",
          isLoading: false,
        });
      }
    };

    getCurrentLocation();
    console.log("마지막 state", kakaomapState);
  }, [kakaomapState.isLoading, course]);

  const handlePolylineClick = (route: Route) => {
    setKakaomapState({
      ...useKakaomapStore.getState().kakaomapState,
      // 폴리라인 시작좌표 이동
      center: { lat: route.path[0].lat, lng: route.path[0].lng },
    });

    // 선택한 폴리라인 값 업데이트
    onClickCourse(route.id);
    console.log("선택한 코스: ", route);
    console.log("selected state: ", selectedCourse);
    console.log("state: ", kakaomapState);

    setRunningCourse(route.path);
  };

  return (
    <Map
      center={kakaomapState.center}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
      }}
      level={openSheet ? 7 : 4}
    >
      {kakaomapState.routes.map((route) => (
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
      {kakaomapState.errMsg && (
        <div style={{ color: "red" }}>{kakaomapState.errMsg}</div>
      )}
      {!kakaomapState.isLoading && <MapMarker position={current}></MapMarker>}
    </Map>
  );
};

export default KakaoMap;
