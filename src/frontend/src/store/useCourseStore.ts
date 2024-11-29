import { LatLng } from "@/types/kakaoMap";
import { create } from "zustand";

type CourseStore = {
  course: LatLng[] | null;
  setCourse: (newCourse: LatLng[]) => void; // 코스 업데이트
};

const useCourseStore = create<CourseStore>()((set) => ({
  course: null,
  setCourse: (newCourse) =>
    set(() => ({
      course: newCourse,
    })), // 코스 업데이트
}));

export default useCourseStore;
