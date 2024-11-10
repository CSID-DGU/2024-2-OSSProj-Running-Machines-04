import KakaoMap from "@/components/common/KakaoMap";
import { ReactComponent as PlayIcon } from "@/assets/images/play.svg";
import HomeCategory from "@/components/record/HomeCategory";
import Searchbar from "@/components/record/Searchbar";
import { useState } from "react";
import BottomSheet from "@/components/record/BottomSheet";

const RecordPage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      {openSheet && (
        <BottomSheet setOpenSheet={setOpenSheet}>
          <>
            <div className="mb-6 text-[18px] text-[#444]">나만의 추천 코스</div>
            <div className="flex items-center justify-between">
              <div className="min-w-[40%] h-[114px] rounded-[10px] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPN4G0eqMmau3KDBVIiRCbyS3Q1XC9KzY1wQ&s"
                  alt="경로"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-[30px] font-semibold text-right">
                  4.38km
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  <div className="bg-[#B1FF8C] p-1 rounded">#경사있는</div>
                  <div className="bg-[#B1FF8C] p-1 rounded">#경치가 좋은</div>
                  <div className="bg-[#B1FF8C] p-1 rounded">
                    #친구와 함께 달리기 좋은
                  </div>
                </div>
              </div>
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
        <PlayIcon className="fixed bottom-[20vh] z-50" />
      </div>
    </>
  );
};

export default RecordPage;
