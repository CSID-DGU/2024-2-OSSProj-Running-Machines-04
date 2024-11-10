import KakaoMap from "@/components/common/KakaoMap";
import { ReactComponent as PlayIcon } from "@/assets/images/play.svg";
import HomeCategory from "@/components/record/HomeCategory";
import Searchbar from "@/components/record/Searchbar";
import { useState } from "react";
import BottomSheet from "@/components/record/BottomSheet";

const HomePage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <div></div>
    </>
  );
};

export default HomePage;
