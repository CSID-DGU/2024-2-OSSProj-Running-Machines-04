import CommnunityHeader from "@/components/community/CommnunityHeader";
import CommunityList from "@/components/community/CommunityList";
import MarathonList from "@/components/community/MarathonList";
import { boardType } from "@/constants/board";
import { useState } from "react";

const CommunityPage = () => {
  const [board, setBoard] = useState<boardType>(boardType.FREE);

  return (
    <div>
      <CommnunityHeader board={board} setBoard={setBoard} />
      {board === boardType.MARATHON ? <MarathonList /> : <CommunityList />}
    </div>
  );
};

export default CommunityPage;
