import { Route } from "@/types/kakaoMap";
import { create } from "zustand";

// GPX 파일에서 위경도 값을 파싱한 전체 코스데이터 저장소
type ParsedCourseStore = {
  parsedCourse: Route[];
  setParsedCourse: (newParsedCourse: Route[]) => void;
};

const useParsedCourseStore = create<ParsedCourseStore>()((set) => ({
  parsedCourse: [],
  setParsedCourse: (newParsedCourse) =>
    set(() => ({
      parsedCourse: newParsedCourse,
    })),
}));

export default useParsedCourseStore;
