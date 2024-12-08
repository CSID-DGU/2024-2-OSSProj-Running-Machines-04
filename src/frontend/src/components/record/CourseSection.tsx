import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react";
import BottomSheet from "./BottomSheet";
import useSelectedCourseStore from "@/store/useSelectedCourseStore";
import {
  useLikesCourseGet,
  usePopularCourseGet,
  useRecommendCourseGet,
} from "@/hooks/useCourse";
import { courseMenu } from "@/constants/course";
import useCourseStore from "@/store/useCourseStore";
import CourseCard from "./CourseCard";

type CourseSectionProps = {
  setOpenSheet: Dispatch<SetStateAction<boolean>>;
  onClickCourse: (id: number) => void;
  selectedCategory: courseMenu;
};

const CourseSection = ({
  setOpenSheet,
  onClickCourse,
  selectedCategory,
}: CourseSectionProps) => {
  const { selectedCourse } = useSelectedCourseStore();
  const { course, setCourse } = useCourseStore();

  const [location, setLocation] = useState({ lat: 37.5665, lon: 126.978 });

  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation?.getCurrentPosition(
        (position) =>
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }),
        (error) => console.error("위치 정보 가져오기 실패:", error)
      );
    };

    const intervalId = setInterval(updateLocation, 5000); // 5초마다 위치 업데이트
    updateLocation(); // 초기 위치 업데이트

    return () => clearInterval(intervalId);
  }, []);

  // 추천코스 선택시 api 호출
  const { data: recommend } = useRecommendCourseGet({
    lat: location.lat,
    lon: location.lon,
  });
  // 인기코스 선택시 api 호출
  const { data: popular } = usePopularCourseGet();
  // 즐겨찾기 선택시 api 호출
  const { data: scrapped } = useLikesCourseGet();

  // 선택 카테고리에 따른 api 매칭
  const courses = useMemo(() => {
    switch (selectedCategory) {
      case courseMenu.PERSONAL:
        return recommend;
      case courseMenu.POPULAR:
        return popular;
      case courseMenu.SCRAPPED:
        return scrapped;
      default:
        return [];
    }
  }, [recommend, popular, scrapped, selectedCategory]);

  useEffect(() => {
    if (courses) {
      setCourse(courses);
    }
  }, [courses, setCourse, course]);

  return (
    <div>
      {selectedCourse && selectedCourse.courseId !== 0 ? (
        <BottomSheet setOpenSheet={setOpenSheet} full={false}>
          <>
            <div className="mb-6 text-[18px] text-[#444]">
              {selectedCategory}
            </div>
            <div className="flex flex-col gap-4 h-[90vh] overflow-scroll">
              {/* 선택된 코스가 있다면 해당 코스만 띄움 */}
              <CourseCard
                courseData={selectedCourse}
                onClickCourse={onClickCourse}
              />
            </div>
          </>
        </BottomSheet>
      ) : (
        <BottomSheet setOpenSheet={setOpenSheet} full={true}>
          <>
            <div className="mb-6 text-[18px] text-[#444]">
              {selectedCategory}
            </div>
            <div className="flex flex-col gap-4 h-[90vh] overflow-scroll">
              {/* 나만의 추천 코스, 월별 인기 코스, 즐겨찾기 카테고리 선택시 해당 코스 전체 오픈 */}
              {course.length > 0 &&
                course.map((couseData) => (
                  <div key={couseData.courseId}>
                    <CourseCard
                      courseData={couseData}
                      onClickCourse={onClickCourse}
                    />
                  </div>
                ))}
            </div>
          </>
        </BottomSheet>
      )}
    </div>
  );
};

export default CourseSection;
