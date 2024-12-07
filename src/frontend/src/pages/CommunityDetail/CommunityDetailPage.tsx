import CommentsList from "@/components/communityDetail/CommentsList";
import CommunityDetailInfo from "@/components/communityDetail/CommunityDetailInfo";
import { ReactComponent as HeartIcon } from "@/assets/icons/HeartIcon.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoardDetailGet } from "@/hooks/useBoard";
import Spinner from "@/components/common/Spinner";

const CommunityDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrapped, setIsScrapped] = useState(false);

  const { data, isLoading } = useBoardDetailGet({
    boardName: "FREE",
    postId: Number(id),
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
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
              <CommentsList comments={data.comments} />
            </div>
          </>
        )
      )}
    </>
  );
};

export default CommunityDetailPage;
