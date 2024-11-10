import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GalleryCard = () => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/crew/gallery/1")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-[33vw] h-[33vw] flex justify-center items-center p-4"
    >
      <img
        className="absolute left-0 top-0 w-full h-full"
        src="https://newsimg-hams.hankookilbo.com/2024/06/25/9b490f29-4415-43bb-bdf8-b77c3ca67413.jpg"
        alt=""
      />
      {hover && (
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] text-white p-4 text-sm overflow-hidden">
          내용프리뷰입니다내용프리뷰입니다내용프리뷰입니다내용프리뷰입니다
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
