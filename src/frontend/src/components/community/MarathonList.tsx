import MarathonCard from "@/components/community/MarathonCard";
import { boardResponse } from "@/types/board";

type MarathonListProps = {
  data: boardResponse[];
};

const MarathonList = ({ data }: MarathonListProps) => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex flex-wrap max-w-[330px] gap-5 justify-between items-center">
        {data.map((board, index) => (
          <MarathonCard key={index} board={board} />
        ))}
      </div>
    </div>
  );
};

export default MarathonList;
