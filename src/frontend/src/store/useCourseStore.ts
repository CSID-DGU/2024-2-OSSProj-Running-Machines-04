import { RouteResponse } from "@/types/routes";
import { create } from "zustand";

// 서버로부터 조회한 코스 데이터 저장소
type CourseStore = {
  course: RouteResponse[] | [];
  setCourse: (newCourse: RouteResponse[]) => void;
};

const useCourseStore = create<CourseStore>()((set) => ({
  course: [],
  setCourse: (newCourse) =>
    set(() => ({
      course: newCourse,
    })),
}));

export default useCourseStore;
