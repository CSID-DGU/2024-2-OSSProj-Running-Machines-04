import CommentsList from "@/components/communityDetail/CommentsList";
import CommunityDetailInfo from "@/components/communityDetail/CommunityDetailInfo";
import { ReactComponent as HeartIcon } from "@/assets/icons/HeartIcon.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCommunityDetailData } from "@/constants/dummy";
import { boardDetailResponse } from "@/types/board";
import { useBoardDetailGet } from "@/hooks/useBoard";

const CommunityDetailPage = () => {
  const navigate = useNavigate();
  const [isScrapped, setIsScrapped] = useState(false);

  const [boardData, setBoardData] = useState<boardDetailResponse>(
    dummyCommunityDetailData
  );

  const { data } = useBoardDetailGet({ boardName: "FREE", postId: 4 });

  useEffect(() => {
    if (data) {
      setBoardData(data);
    }
  }, [data]);

  return (
    <>
      {data ? (
        <>
          <div className="shadow-sm w-full flex justify-start p-4 mb-6">
            <BackIcon onClick={() => navigate("/community")} />
          </div>
          <div className="mb-24 px-8">
            <CommunityDetailInfo data={data} />
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
      ) : (
        <div>로딩 중입니다</div>
      )}
    </>
  );
};

export default CommunityDetailPage;
