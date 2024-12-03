import { Dispatch, SetStateAction, useEffect } from "react";
import { ReactComponent as CourseCTA } from "@/assets/icons/CourseCTA.svg";
import BottomSheet from "./BottomSheet";
import useSelectedCourseStore from "@/store/useSelectedCourseStore";
import {
  useLikesCourseGet,
  usePopularCourseGet,
  useRecommendCourseGet,
} from "@/hooks/useCourse";
import { courseMenu } from "@/constants/course";
import useCourseStore from "@/store/useCourseStore";

type CourseSectionProps = {
  setOpenSheet: Dispatch<SetStateAction<boolean>>;
  resetSelectedCourse: () => void;
  onClickCourse: (id: number) => void;
  selectedCategory: courseMenu;
};

const CourseSection = ({
  setOpenSheet,
  resetSelectedCourse,
  onClickCourse,
  selectedCategory,
}: CourseSectionProps) => {
  const { selectedCourse } = useSelectedCourseStore();
  const { course, setCourse } = useCourseStore();

  // 추천코스 선택시 api 호출
  const { data: recommend } = useRecommendCourseGet({
    lat: 37.5665,
    lon: 126.978,
  }); // 임의 좌표

  // 인기코스 선택시 api 호출
  const { data: popular } = usePopularCourseGet();

  // 즐겨찾기 선택시 api 호출
  const { data: scrapped } = useLikesCourseGet();

  useEffect(() => {
    // 나만의 추천코스 카테고리
    if (selectedCategory == courseMenu.PERSONAL && recommend) {
      setCourse(recommend);
      console.log(recommend);
    }
    // 인기코스 카테고리
    if (selectedCategory == courseMenu.POPULAR && popular) {
      setCourse(popular);
      console.log(popular);
    }
    // 즐겨찾기 카테고리
    if (selectedCategory == courseMenu.SCRAPPED && scrapped) {
      setCourse(scrapped);
      console.log(scrapped);
    }
  }, [recommend, popular, scrapped, selectedCategory]);

  return (
    <div>
      <BottomSheet
        setOpenSheet={setOpenSheet}
        onClose={resetSelectedCourse}
        full={true}
      >
        <>
          <div className="mb-6 text-[18px] text-[#444]">{selectedCategory}</div>
          <div className="flex flex-col gap-4 h-[90vh] overflow-scroll">
            {/* 선택된 코스가 있다면 해당 코스만 띄움 */}
            {selectedCourse && selectedCourse.courseId !== 0 ? (
              <div className="flex items-center justify-between gap-2">
                <div className="p-4 w-[70%] h-full bg-courseGradient rounded-[10px] overflow-hidden flex flex-col justify-center items-center">
                  <div className="text-[#444] font-semibold">
                    {selectedCourse.name}
                  </div>
                  <div className="text-[#444] text-sm">
                    "{selectedCourse.description}"
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="text-[30px] font-semibold text-right">
                    <div className="flex justify-end items-center gap-3">
                      {selectedCourse.distance}km
                      <CourseCTA
                        onClick={() => onClickCourse(selectedCourse.courseId)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {selectedCourse.tags.map((tag) => (
                      <div className="bg-[#B1FF8C] p-1 rounded text-[14px] font-extralight">
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // 나만의 추천 코스, 월별 인기 코스, 즐겨찾기 카테고리 선택시 오픈
              course.length > 0 &&
              course.map((couseData, index) => (
                <div
                  key={index}
                  onClick={() => onClickCourse(couseData.courseId)}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="p-4 w-[70%] h-full bg-courseGradient rounded-[10px] overflow-hidden flex flex-col justify-center items-center">
                    <div className="text-[#444] font-semibold">
                      {couseData.name}
                    </div>
                    <div className="text-[#444] text-sm">
                      "{couseData.description}"
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="text-[30px] font-semibold text-right">
                      {couseData.distance}km
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {couseData.tags.map((tag) => (
                        <div className="bg-[#B1FF8C] p-1 rounded text-[14px] font-extralight">
                          #{tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      </BottomSheet>
    </div>
  );
};

export default CourseSection;
