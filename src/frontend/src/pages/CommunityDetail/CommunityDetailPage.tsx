import CommentsList from "@/components/communityDetail/CommentsList";
import CommunityDetailInfo from "@/components/communityDetail/CommunityDetailInfo";
import { ReactComponent as HeartIcon } from "@/assets/icons/HeartIcon.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoardCommentPost, useBoardDetailGet } from "@/hooks/useBoard";
import Spinner from "@/components/common/Spinner";
import CommentInput from "@/components/common/CommentInput";

const CommunityDetailPage = () => {
  const navigate = useNavigate();
  const { id, board } = useParams();
  const [isScrapped, setIsScrapped] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<number | null>(null);

  const { mutate } = useBoardCommentPost(
    String(board),
    Number(id),
    comment,
    selectedComment
  );
  const handleCommentSubmit = () => {
    console.log(comment);
    mutate();
  };

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
            <CommentInput
              comment={comment}
              setComment={setComment}
              onSubmit={handleCommentSubmit}
            />
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
              <CommentsList
                comments={data.comments}
                setSelectedComment={setSelectedComment}
                selectedComment={selectedComment}
              />
            </div>
          </>
        )
      )}
    </>
  );
};

export default CommunityDetailPage;
