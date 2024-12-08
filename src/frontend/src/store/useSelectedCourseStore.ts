import { RouteResponse } from "@/types/routes";
import { create } from "zustand";

// 코스 기록 화면의 추천코스/인기코스 등의 특정 코스 선택 정보(RouteResponse 타입) 저장소
type SelectedCourseStore = {
  selectedCourse: RouteResponse | null;
  setSelectedCourse: (newSelectedCourse: RouteResponse | null) => void; // 코스 업데이트
};

const useSelectedCourseStore = create<SelectedCourseStore>()((set) => ({
  // 초기화
  selectedCourse: {
    courseId: 0,
    courseUrl: "",
    distance: 0,
    fileName: "",
    name: "",
    tags: [],
    description: "",
    toiletCounts: 0,
    toiletLocation: [],
    storeCounts: 0,
    storeLocation: [],
    trafficLightCounts: 0,
    courseLiked: false,
  },
  setSelectedCourse: (newSelectedCourse) =>
    set(() => ({
      selectedCourse: newSelectedCourse,
    })), // 코스 업데이트
}));

export default useSelectedCourseStore;
