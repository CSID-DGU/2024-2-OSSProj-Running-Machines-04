import CommentsList from "@/components/communityDetail/CommentsList";
import CommunityDetailInfo from "@/components/communityDetail/CommunityDetailInfo";
import { ReactComponent as HeartIcon } from "@/assets/icons/HeartIcon.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityDetailPage = () => {
  const navigate = useNavigate();
  const [isScrapped, setIsScrapped] = useState(false);

  return (
    <>
      <div className="shadow-sm w-full flex justify-start p-4 mb-6">
        <BackIcon onClick={() => navigate("/community")} />
      </div>
      <div className="mb-24 px-8">
        <CommunityDetailInfo />
        <div className="py-4 border-b border-[#D9D9D9]">
          <HeartIcon
            onClick={() => setIsScrapped(!isScrapped)}
            fill={isScrapped ? "#F17171" : "#fff"}
            stroke={isScrapped ? "#F17171" : "#afafaf"}
          />
        </div>
        <CommentsList />
      </div>
    </>
  );
};

export default CommunityDetailPage;
