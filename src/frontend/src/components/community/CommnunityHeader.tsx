import { boardType } from "@/constants/board";
import { Dispatch, SetStateAction } from "react";

type CommnunityHeaderProps = {
  board: boardType;
  setBoard: Dispatch<SetStateAction<boardType>>;
};

const CommnunityHeader = ({ board, setBoard }: CommnunityHeaderProps) => {
  const getFontColor = (path: string) =>
    board === path ? "text-[#9993E5]" : "text-black";

  return (
    <div className="flex p-5 shadow-searchbarShadow justify-between">
      <div
        onClick={() => setBoard(boardType.FREE)}
        className={`${getFontColor(
          boardType.FREE
        )} text-[14px] font-semibold cursor-pointer`}
      >
        자유 게시판
      </div>
      <div
        onClick={() => setBoard(boardType.TOGETHER)}
        className={`${getFontColor(
          boardType.TOGETHER
        )} text-[14px] font-semibold cursor-pointer`}
      >
        함께 달려요
      </div>
      <div
        onClick={() => setBoard(boardType.SHOES)}
        className={`${getFontColor(
          boardType.SHOES
        )} text-[14px] font-semibold cursor-pointer`}
      >
        러닝화 추천
      </div>
      <div
        onClick={() => setBoard(boardType.MARATHON)}
        className={`${getFontColor(
          boardType.MARATHON
        )} text-[14px] font-semibold cursor-pointer`}
      >
        마라톤 일정
      </div>
    </div>
  );
};

export default CommnunityHeader;
