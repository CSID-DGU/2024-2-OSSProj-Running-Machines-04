import { boardType } from "@/constants/board";
import { Dispatch, SetStateAction } from "react";

type CommunityWriteHeaderProps = {
  onSubmit: () => void;
  board: boardType;
  setBoard: Dispatch<SetStateAction<boardType>>;
};

const CommunityWriteHeader = ({
  onSubmit,
  board,
  setBoard,
}: CommunityWriteHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between py-5 px-8 border-b border-[#D9D9D9]">
        <div className="text-[18px] text-[#515151]">뒤로</div>
        <div className="text-[18px] font-bold">게시물 작성</div>
        <div onClick={onSubmit} className="text-[18px] text-[#000]">
          게시
        </div>
      </div>

      <div className="flex gap-8 text-[15px] py-5 px-8">
        <span
          className={`cursor-pointer font-semibold ${
            board === boardType.FREE ? "text-[#000]" : "text-[#999]"
          }`}
          onClick={() => setBoard(boardType.FREE)}
        >
          자유게시판
        </span>
        <span
          className={`cursor-pointer font-semibold ${
            board === boardType.TOGETHER ? "text-[#000]" : "text-[#999]"
          }`}
          onClick={() => setBoard(boardType.TOGETHER)}
        >
          함께 달려요
        </span>
        <span
          className={`cursor-pointer font-semibold ${
            board === boardType.SHOES ? "text-[#000]" : "text-[#999]"
          }`}
          onClick={() => setBoard(boardType.SHOES)}
        >
          러닝화 추천
        </span>
      </div>
    </div>
  );
};

export default CommunityWriteHeader;
