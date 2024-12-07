import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import useParsedCourseStore from "@/store/useParsedCourse";
import useKakaomapStore from "@/store/useKakaomapStore";

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
  const { setKakaomapState } = useKakaomapStore();
  const { parsedCourse } = useParsedCourseStore();

  // 위치 초기화
  const [location, setLocation] = useState<{ lat: number; lon: number }>({
    lat: 37.5665,
    lon: 126.978,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 브라우저에서 위치 정보 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            console.error("위치 정보를 가져오는데 실패했습니다.", error);
          }
        );
      }
    }, 5000); // 5초마다 위치 업데이트

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

  const handleCourseClick = (id: number) => {
    // 해당 id와 일치하는 아이템 찾기
    const route = parsedCourse.find((route) => route.id == id);

    // 아이템이 존재하고 path가 유효하다면 코스의 시작점으로 카카오맵 센터 설정
    if (route && route.path.length > 0) {
      setKakaomapState({
        ...useKakaomapStore.getState().kakaomapState,
        // 폴리라인 시작좌표 이동
        center: { lat: route.path[0].lat, lng: route.path[0].lng },
      });
    }
    onClickCourse(id);
  };

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
      {selectedCourse && selectedCourse.courseId !== 0 ? (
        <BottomSheet setOpenSheet={setOpenSheet} full={false}>
          <>
            <div className="mb-6 text-[18px] text-[#444]">
              {selectedCategory}
            </div>
            <div className="flex flex-col gap-4 h-[90vh] overflow-scroll">
              {/* 선택된 코스가 있다면 해당 코스만 띄움 */}
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
                        onClick={() =>
                          handleCourseClick(selectedCourse.courseId)
                        }
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
                course.map((couseData, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="p-4 w-[50%] h-full bg-courseGradient rounded-[10px] overflow-hidden flex flex-col justify-center items-center">
                      <div className="text-[#444] font-semibold">
                        {couseData.name}
                      </div>
                      <div className="text-[#444] text-sm text-center">
                        "{couseData.description}"
                      </div>
                    </div>

                    <div className="w-[50%] flex flex-col gap-4">
                      <div className="flex justify-end items-center gap-3 text-3xl font-bold">
                        {couseData.distance}km
                        <CourseCTA
                          onClick={() => handleCourseClick(couseData.courseId)}
                        />
                      </div>
                      <div className="flex flex-wrap justify-end gap-2">
                        {couseData.tags.map((tag) => (
                          <div className="bg-[#B1FF8C] px-2 rounded text-[14px] font-extralight">
                            #{tag}
                          </div>
                        ))}
                      </div>
                    </div>
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
