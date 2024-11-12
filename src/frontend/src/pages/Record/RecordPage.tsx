import KakaoMap from "@/components/common/KakaoMap";
import { ReactComponent as PlayIcon } from "@/assets/images/play.svg";
import HomeCategory from "@/components/record/HomeCategory";
import Searchbar from "@/components/record/Searchbar";
import { useEffect, useState } from "react";
import BottomSheet from "@/components/record/BottomSheet";
import { courseMenu } from "@/constants/course";
import { useRecommendCourseGet } from "@/hooks/useCourse";
import { courseResponseType } from "@/types/course";
import AlertModal from "@/components/common/AlertModal";
import { dummyCourseData } from "@/constants/dummy";

const RecordPage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<courseMenu>(
    courseMenu.PERSONAL
  );
  const [courseData, setCourseData] = useState<courseResponseType[]>();

  const { data } = useRecommendCourseGet({ lat: 37.5665, lon: 126.978 }); // 임의 좌표

  // useEffect(() => {
  //   if (data) {
  //     setCourseData(data);
  //     console.log(data);
  //   }
  // }, [data]);

  useEffect(() => {
    setCourseData(dummyCourseData);
  }, []);

  return (
    <>
      {courseData ? (
        <>
          {openSheet && (
            <BottomSheet setOpenSheet={setOpenSheet}>
              <>
                <div className="mb-6 text-[18px] text-[#444]">
                  나만의 추천 코스
                </div>
                <div className="flex flex-col gap-4 h-[90vh] overflow-scroll">
                  {courseData.map((course, index) => (
                    <div
                      key={index}
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
                  ))}
                </div>
              </>
            </BottomSheet>
          )}
          <div className="flex flex-col justify-center items-center">
            <Searchbar />
            <HomeCategory
              setOpenSheet={setOpenSheet}
              setSelectedCategory={setSelectedCategory}
            />
            <KakaoMap />
            <PlayIcon
              onClick={() => setConfirmModal(true)}
              className="fixed bottom-[20vh] z-50"
            />
            {confirmModal && <AlertModal />}
          </div>
        </>
      ) : (
        <div>로딩 중입니다</div>
      )}
    </>
  );
};

export default RecordPage;
