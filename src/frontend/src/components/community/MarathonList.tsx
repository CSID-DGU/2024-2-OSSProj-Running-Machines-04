import MarathonCard from "@/components/community/MarathonCard";
import { boardType } from "@/constants/board";
import { boardResponse } from "@/types/board";

type MarathonListProps = {
  data: boardResponse[];
  boardName: boardType;
};

const MarathonList = ({ data, boardName }: MarathonListProps) => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="grid grid-cols-2 gap-5">
        {data.map((board, index) => (
          <MarathonCard key={index} board={board} boardName={boardName} />
        ))}
      </div>
    </div>
  );
};

export default MarathonList;
