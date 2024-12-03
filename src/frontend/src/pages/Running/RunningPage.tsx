"use client";

import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { LatLng } from "@/types/kakaoMap";
import useRunningCourseStore from "@/store/useRunningCourseStore";
import { ReactComponent as EndIcon } from "@/assets/icons/EndIcon.svg";
import { ReactComponent as StopIcon } from "@/assets/icons/StopIcon.svg";
import { ReactComponent as RestartIcon } from "@/assets/icons/RestartIcon.svg";
import { useRunningRecordPost } from "@/hooks/useRunning";
import { useParams } from "react-router-dom";
import { runningRequest } from "@/types/running";

const calculateDistance = (path: LatLng[]) => {
  if (path.length < 2) return 0;

  const toRad = (value: number) => (value * Math.PI) / 180;

  let distance = 0;
  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1];
    const current = path[i];
    const R = 6371; // 지구 반지름 (km)

    const dLat = toRad(current.lat - prev.lat);
    const dLng = toRad(current.lng - prev.lng);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(prev.lat)) *
        Math.cos(toRad(current.lat)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance += R * c;
  }

  return distance;
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
};

const formatPace = (paceString: string): number => {
  const [minutes, seconds] = paceString.split(/['"]/);

  return parseFloat(`${minutes}.${seconds}`);
};

// gpx 파일로 변환
const convertToGPX = (path: LatLng[]): File => {
  const gpxHeader = `<?xml version="1.0" encoding="UTF-8"?>
  <gpx version="1.1" creator="YourAppName" xmlns="http://www.topografix.com/GPX/1/1">
    <trk>
      <name>Running Track</name>
      <trkseg>`;

  const gpxFooter = `</trkseg>
    </trk>
  </gpx>`;

  const gpxData = path
    .map((point) => {
      return `<trkpt lat="${point.lat}" lon="${point.lng}">
          <ele>0</ele> <!-- Assuming elevation is 0, you can add actual data if available -->
          <time>${new Date().toISOString()}</time>
        </trkpt>`;
    })
    .join("");

  const gpxXML = `${gpxHeader}${gpxData}${gpxFooter}`;

  const blob = new Blob([gpxXML], { type: "application/gpx+xml" });

  const gpxFile = new File([blob], "track.gpx", {
    type: "application/gpx+xml",
  });

  return gpxFile;
};

const RunningPage = () => {
  const { runningCourse } = useRunningCourseStore(); // 선택된 코스
  const [state, setState] = useState<LatLng[]>([]); // 실시간 경로 리스트
  const stateRef = useRef<LatLng[]>([]); // 최신 state를 참조하기 위한 ref
  const [distance, setDistance] = useState(0); // 총 거리
  const [duration, setDuration] = useState(0); // 총 소요 시간 (초 단위)
  const [pace, setPace] = useState("0"); // 평균 페이스 (분/킬로미터)
  const [isPaused, setIsPaused] = useState(false); // 정지 상태

  const { id } = useParams();

  const formattedData: runningRequest = {
    distance: distance,
    duration: duration,
    pace: formatPace(pace), // 포맷팅된 pace 값
  };

  // 코스를 선택하고 뛰었다면 courseId 추가
  if (Number(id) !== 0) {
    formattedData.courseId = Number(id);
  }

  const { mutate } = useRunningRecordPost(
    formattedData,
    convertToGPX(state),
    Number(id)
  );

  const handleStop = () => {
    setIsPaused((prev) => !prev); // 정지/재개 상태 토글
  };
  const handleDone = () => {
    setIsPaused(true);
    console.log(
      `
      러닝 기록
      거리: ${distance.toFixed(2)} km
      시간: ${formatTime(duration)}
      평균 페이스: ${pace} 분/km
    `
    );

    mutate();
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setState([initialLocation]);
          stateRef.current = [initialLocation];
        },
        (error) => console.error("현재 위치를 받아오지 못하였습니다.", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation이 지원되지 않습니다.");
    }
  }, []);

  useEffect(() => {
    const addLocation = () => {
      console.log("state: ", state);

      if (isPaused) return; // 정지 상태면 위치 추가 중단
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const lastLocation = stateRef.current[stateRef.current.length - 1];
            console.log("newLocation: ", newLocation);
            console.log("lastLocation: ", lastLocation);

            if (
              !lastLocation ||
              lastLocation.lat !== newLocation.lat ||
              lastLocation.lng !== newLocation.lng
            ) {
              const updatedState = [...stateRef.current, newLocation];
              setState(updatedState);
              stateRef.current = updatedState;
              console.log("이동!");

              // 거리 계산 업데이트
              const newDistance = calculateDistance(updatedState);
              setDistance(newDistance);

              // 평균 페이스 계산
              if (duration > 0 && newDistance > 0) {
                const paceMinutes = duration / 60 / newDistance;
                setPace(
                  `${Math.floor(paceMinutes)}'${Math.floor(
                    (paceMinutes % 1) * 60
                  )}"`
                );
              }
            }
          },
          (error) =>
            console.error("실시간 위치를 받아오지 못하였습니다.", error),
          { enableHighAccuracy: true }
        );
      }
    };

    const intervalId = setInterval(() => {
      if (!isPaused) {
        addLocation();
        setDuration((prev) => prev + 1); // 1초 단위로 시간 증가
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, duration]);

  const current = state[state.length - 1];

  return (
    <div>
      {current ? (
        <>
          <Map
            center={current}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100vh",
            }}
            level={1}
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
            {runningCourse && (
              <Polyline
                path={runningCourse}
                strokeWeight={6}
                strokeColor="#E21919"
                strokeOpacity={0.7}
                strokeStyle="solid"
              />
            )}
            <MapMarker position={current} />
          </Map>
          <div className="fixed bottom-40 left-0 flex items-center justify-between w-full px-[15%]">
            {isPaused ? (
              <RestartIcon onClick={handleStop} />
            ) : (
              <StopIcon onClick={handleStop} />
            )}
            <EndIcon onClick={handleDone} />
          </div>
          <div className="fixed top-10 left-6 px-6 py-2 text-black bg-[rgba(255,255,255,0.8)]">
            <p>거리: {distance.toFixed(2)} km</p>
            <p>시간: {formatTime(duration)}</p>
            <p>페이스: {pace} 분/km</p>
          </div>
        </>
      ) : (
        <p>현재 위치를 불러오는 중...</p>
      )}
    </div>
  );
};

export default RunningPage;
