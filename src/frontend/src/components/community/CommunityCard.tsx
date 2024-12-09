import { boardType } from "@/constants/board";
import { boardResponse } from "@/types/board";
import { useNavigate } from "react-router-dom";

type CommunityCardProps = {
  board: boardResponse;
  boardName: boardType;
};

const CommunityCard = ({ board, boardName }: CommunityCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/community/${boardName}/${board.postId}`)}
      className="px-8 py-6 flex items-center justify-between border-b border-[#DFDFDF]"
    >
      <div className="flex flex-col">
        <div className="text-[18px] text-[#444] font-semibold">
          {board.title}
        </div>
        <div className="mb-3 text-[#444] text-[10px]">
          {board.createdAt.slice(0, 10)} | {board.writer} | 댓글{" "}
          {board.commentCount}
        </div>
        <div className="text-[14px] text-[#515151]">{board.contentPreview}</div>
      </div>
      <div className="w-[70px] h-[4.375rem] overflow-hidden">
        {board.postImages[0] && (
          <img
            className="w-full h-full object-cover"
            src={board.postImages[0]}
            alt="사진"
          />
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
