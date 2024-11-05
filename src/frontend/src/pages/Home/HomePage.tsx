import KakaoMap from "@/components/common/KakaoMap";
import { ReactComponent as PlayIcon } from "@/assets/images/play.svg";
import HomeCategory from "@/components/home/HomeCategory";
import Searchbar from "@/components/home/Searchbar";
import { useState } from "react";
import BottomSheet from "@/components/home/BottomSheet";

const HomePage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      {openSheet && <BottomSheet setOpenSheet={setOpenSheet} />}
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

export default HomePage;
