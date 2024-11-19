import CommunityCard from "@/components/community/CommunityCard";
import { boardResponse } from "@/types/board";

type CommunityListProps = {
  data: boardResponse[];
};

const CommunityList = ({ data }: CommunityListProps) => {
  return (
    <div className="flex flex-col">
      {data.map((board, index) => (
        <CommunityCard key={index} board={board} />
      ))}
    </div>
  );
};

export default CommunityList;
