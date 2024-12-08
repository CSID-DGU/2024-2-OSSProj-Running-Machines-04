import KakaoMap from "@/components/common/KakaoMap";
import { ReactComponent as PlayIcon } from "@/assets/images/play.svg";
import HomeCategory from "@/components/record/HomeCategory";
import Searchbar from "@/components/record/Searchbar";
import { useState } from "react";
import { courseMenu } from "@/constants/course";
import AlertModal from "@/components/common/AlertModal";
import CourseSection from "@/components/record/CourseSection";
import useSelectedCourseStore from "@/store/useSelectedCourseStore";
import useCourseStore from "@/store/useCourseStore";

const RecordPage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<courseMenu>(
    courseMenu.PERSONAL
  );
  const { setSelectedCourse, selectedCourse } = useSelectedCourseStore();
  const { course } = useCourseStore();

  // 선택한 코스 초기화 핸들러
  const resetSelectedCourse = () => {
    setSelectedCourse({
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
    });
  };

  // 코스 선택 핸들러
  const handleClickCourse = (id: number) => {
    if (course) {
      // 선택한 ID의 코스 업데이트
      const selected = course.find((course) => course.courseId === id);
      console.log("id", id);
      console.log("courseData", course);
      console.log("handleClick", selected);
      console.log("selectedCourse", selectedCourse);

      if (selected) {
        setSelectedCourse(selected); // 선택된 ID 업데이트
        setOpenSheet(!openSheet); // Sheet 여부
      }
    }
  };

  return (
    <>
      {openSheet && (
        <CourseSection
          setOpenSheet={setOpenSheet}
          onClickCourse={handleClickCourse}
          selectedCategory={selectedCategory}
        />
      )}

      {/* 기록 화면 */}
      <div className="flex flex-col justify-center items-center">
        <Searchbar />
        <HomeCategory
          setOpenSheet={setOpenSheet}
          setSelectedCategory={setSelectedCategory}
          onClose={resetSelectedCourse}
        />
        <KakaoMap openSheet={openSheet} onClickCourse={handleClickCourse} />
        <PlayIcon
          onClick={() => setConfirmModal(true)}
          className="fixed bottom-[20vh] z-50"
        />
        {/* 러닝 시작 모달 */}
        {confirmModal && <AlertModal />}
      </div>
    </>
  );
};

export default RecordPage;
