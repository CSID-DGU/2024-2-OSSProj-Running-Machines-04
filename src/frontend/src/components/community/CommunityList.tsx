import CommunityCard from "@/components/community/CommunityCard";
import { boardType } from "@/constants/board";
import { boardResponse } from "@/types/board";

type CommunityListProps = {
  data: boardResponse[];
  boardName: boardType;
};

const CommunityList = ({ data, boardName }: CommunityListProps) => {
  return (
    <div className="flex flex-col">
      {data.map((board, index) => (
        <CommunityCard key={index} board={board} boardName={boardName} />
      ))}
    </div>
  );
};

export default CommunityList;
