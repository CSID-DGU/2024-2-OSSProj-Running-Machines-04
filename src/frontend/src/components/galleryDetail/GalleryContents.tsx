import { ReactComponent as HeartIcon } from "@/assets/icons/HeartIcon.svg";
import { ReactComponent as CommentIcon } from "@/assets/icons/CommentIcon.svg";
import { useState } from "react";

const GalleryContents = () => {
  const [isScrapped, setIsScrapped] = useState(false);

  return (
    <div>
      <div className="max-h-[50vh] max-w-screen overflow-hidden">
        <img
          className=""
          src="https://newsimg-hams.hankookilbo.com/2024/06/25/9b490f29-4415-43bb-bdf8-b77c3ca67413.jpg"
          alt="image"
        />
      </div>
      <div className="flex justify-between px-4 py-2">
        <HeartIcon
          onClick={() => setIsScrapped(!isScrapped)}
          fill={isScrapped ? "#F17171" : "#fff"}
          stroke={isScrapped ? "#F17171" : "#afafaf"}
        />
        <CommentIcon />
      </div>
      <div className="px-6">
        <span className="text-[18px] font-bold">러미사</span> 오늘은 새로운
        크루원들과 러닝을 했습니다! 서로의 실력을 알아가며 부족한 점을 서로
        채워주는 모습이 참 보기 좋네요~ 앞으로도 활발한 활동 기대하겠습니다!
      </div>
    </div>
  );
};

export default GalleryContents;
