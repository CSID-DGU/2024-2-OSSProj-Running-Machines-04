import { LatLng } from "@/types/kakaoMap";
import { create } from "zustand";

// 선택한 코스로 달리기를 시작할 때 파싱된 코스 위/경도 저장소
type RunningRunningCourseStore = {
  runningCourse: LatLng[] | null;
  setRunningCourse: (newRunningCourse: LatLng[]) => void; // 코스 업데이트
};

const useRunningRunningCourseStore = create<RunningRunningCourseStore>()(
  (set) => ({
    runningCourse: null,
    setRunningCourse: (newRunningCourse) =>
      set(() => ({
        runningCourse: newRunningCourse,
      })), // 코스 업데이트
  })
);

export default useRunningRunningCourseStore;
