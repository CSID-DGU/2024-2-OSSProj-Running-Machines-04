import { ReactComponent as FlagIcon } from "@/assets/icons/FlagIcon.svg";
import { ReactComponent as PopularIcon } from "@/assets/icons/PopularIcon.svg";
import { ReactComponent as ScrappedIcon } from "@/assets/icons/ScrappedIcon.svg";
import { courseMenu } from "@/constants/course";
import { Dispatch, SetStateAction } from "react";

type HomeCategoryProps = {
  setOpenSheet: Dispatch<SetStateAction<boolean>>;
  setSelectedCategory: Dispatch<SetStateAction<courseMenu>>;
};

const HomeCategory = ({
  setOpenSheet,
  setSelectedCategory,
}: HomeCategoryProps) => {
  const handelPersonalClick = () => {
    setOpenSheet(true);
    setSelectedCategory(courseMenu.PERSONAL);
  };
  const handelPopularClick = () => {
    setOpenSheet(true);
    setSelectedCategory(courseMenu.POPULAR);
  };
  const handelScrappedClick = () => {
    setOpenSheet(true);
    setSelectedCategory(courseMenu.SCRAPPED);
  };

  return (
    <div className="z-10 p-2 text-[12px] flex gap-3 justify-start w-full">
      <div
        onClick={handelPersonalClick}
        className="flex gap-1 justify-center items-center p-2 rounded-[20px] bg-[#FBFAE2]"
      >
        <FlagIcon />
        <button>나만의 추천 코스</button>
      </div>
      <div
        onClick={handelPopularClick}
        className="flex gap-1 justify-center items-center p-2 rounded-[20px] bg-[#EAF5FD]"
      >
        <PopularIcon />
        <button>월별 인기 코스</button>
      </div>
      <div
        onClick={handelScrappedClick}
        className="flex gap-1 justify-center items-center p-2 rounded-[20px] bg-[#FFECEC]"
      >
        <ScrappedIcon />
        <button>즐겨찾기</button>
      </div>
    </div>
  );
};

export default HomeCategory;
