import { boardResponse } from "@/types/board";
import { useNavigate } from "react-router-dom";

type MarathonCardProps = {
  board: boardResponse;
};

const MarathonCard = ({ board }: MarathonCardProps) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/community/1`)}>
      {/* <div onClick={() => navigate(`/community/${board.postId}`)}> */}
      <div className="mb-3 w-[150px] h-[210px] overflow-hidden">
        <img className="w-full h-full object-cover" src="" alt="" />
      </div>
      <div className="text-[14px] text-[#444] font-semibold">
        {board.title}
        {/* 손기정 평화 마라톤대회 */}
      </div>
      <div className="text-[10px] text-[#444]">
        {board.createdAt.slice(0, 10)}
      </div>
      <div className="text-[12px] text-[#444]">{board.title}</div>
      {/* <div className="text-[12px] text-[#444]">상암월드컵공원 평화광장</div> */}
    </div>
  );
};

export default MarathonCard;
