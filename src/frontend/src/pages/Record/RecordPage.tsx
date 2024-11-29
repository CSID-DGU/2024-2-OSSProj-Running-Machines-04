import KakaoMap from "@/components/common/KakaoMap";
import { ReactComponent as PlayIcon } from "@/assets/images/play.svg";
import HomeCategory from "@/components/record/HomeCategory";
import Searchbar from "@/components/record/Searchbar";
import { useEffect, useState } from "react";
import BottomSheet from "@/components/record/BottomSheet";
import { courseMenu } from "@/constants/course";
import { useRecommendCourseGet } from "@/hooks/useCourse";
import AlertModal from "@/components/common/AlertModal";
import { RouteResponse } from "@/types/routes";
import { ReactComponent as CourseCTA } from "@/assets/icons/CourseCTA.svg";

const RecordPage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<courseMenu>(
    courseMenu.PERSONAL
  );
  const [selectedCourse, setSelectedCourse] = useState<RouteResponse>({
    courseId: 0,
    courseUrl: "",
    distance: 0,
    fileName: "",
    name: "",
    tags: [],
  });
  const [courseData, setCourseData] = useState<RouteResponse[]>();

  const resetSelectedCourse = () => {
    setSelectedCourse({
      courseId: 0,
      courseUrl: "",
      distance: 0,
      fileName: "",
      name: "",
      tags: [],
    });
  };

  const handleClickCourse = (id: number) => {
    if (courseData) {
      // 선택한 ID의 코스 업데이트
      const selectedCourse = courseData.find(
        (course) => course.courseId === id
      );

      if (selectedCourse) {
        setSelectedCourse(selectedCourse); // 선택된 ID 업데이트
        setOpenSheet(!openSheet); // Sheet 여부
        // setCourse({courseId: selectedCourse.courseId, path: selectedCourse.})
      }
    }
  };

  const { data } = useRecommendCourseGet({ lat: 37.5665, lon: 126.978 }); // 임의 좌표

  useEffect(() => {
    // 나만의 추천코스 카테고리
    if (selectedCategory == courseMenu.PERSONAL && data) {
      setCourseData(data);
      console.log(data);
    }
  }, [data]);

  return (
    <>
      {courseData ? (
        <>
          {openSheet && (
            <BottomSheet
              setOpenSheet={setOpenSheet}
              onClose={resetSelectedCourse}
            >
              <>
                <div className="mb-6 text-[18px] text-[#444]">
                  나만의 추천 코스
                </div>
                <div className="flex flex-col gap-4 h-[90vh] overflow-scroll">
                  {/* 선택된 코스가 있다면 해당 코스만 띄움 */}
                  {selectedCourse.courseId !== 0 ? (
                    <div className="flex items-center justify-between gap-2">
                      <div className="p-4 min-w-[50%] h-full bg-courseGradient rounded-[10px] overflow-hidden flex justify-center items-center">
                        <div className="text-[#444] font-semibold">
                          {selectedCourse.name}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="text-[30px] font-semibold text-right">
                          <div className="flex justify-end items-center gap-3">
                            {selectedCourse.distance}km
                            <CourseCTA
                              onClick={() =>
                                handleClickCourse(selectedCourse.courseId)
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
                  ) : (
                    // 나만의 추천 코스, 월별 인기 코스, 즐겨찾기 카테고리 선택시 오픈
                    courseData.map((course, index) => (
                      <div
                        key={index}
                        onClick={() => handleClickCourse(course.courseId)}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="p-4 min-w-[50%] h-full bg-courseGradient rounded-[10px] overflow-hidden flex justify-center items-center">
                          <div className="text-[#444] font-semibold">
                            {course.name}
                          </div>
                        </div>

                        <div className="flex flex-col gap-4">
                          <div className="text-[30px] font-semibold text-right">
                            {course.distance}km
                          </div>
                          <div className="flex flex-wrap justify-end gap-2">
                            {course.tags.map((tag) => (
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
          )}

          {/* 기록 화면 */}
          <div className="flex flex-col justify-center items-center">
            <Searchbar />
            <HomeCategory
              setOpenSheet={setOpenSheet}
              setSelectedCategory={setSelectedCategory}
              onClose={resetSelectedCourse}
            />
            <KakaoMap
              selectedCourse={selectedCourse}
              onClickCourse={handleClickCourse}
            />
            <PlayIcon
              onClick={() => setConfirmModal(true)}
              className="fixed bottom-[20vh] z-50"
            />
            {/* 러닝 시작 모달 */}
            {confirmModal && <AlertModal courseId={selectedCourse.courseId} />}
          </div>
        </>
      ) : (
        <div>로딩 중입니다</div>
      )}
    </>
  );
};

export default RecordPage;
