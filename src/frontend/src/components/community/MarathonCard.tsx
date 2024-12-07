import { boardType } from "@/constants/board";
import { boardResponse } from "@/types/board";
import { useNavigate } from "react-router-dom";

type MarathonCardProps = {
  board: boardResponse;
  boardName: boardType;
};

const MarathonCard = ({ board, boardName }: MarathonCardProps) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/community/${boardName}/${board.postId}`)}>
      <div className="mb-3 w-[150px] h-[210px] overflow-hidden">
        <img className="w-full h-full object-cover" src="" alt="" />
      </div>
      <div className="text-[14px] text-[#444] font-semibold">{board.title}</div>
      <div className="text-[10px] text-[#444]">
        {board.createdAt.slice(0, 10)}
      </div>
      <div className="text-[12px] text-[#444]">{board.contentPreview}</div>
    </div>
  );
};

export default MarathonCard;
