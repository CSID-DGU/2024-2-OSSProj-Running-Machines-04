import CommnunityHeader from "@/components/community/CommnunityHeader";
import CommunityList from "@/components/community/CommunityList";
import MarathonList from "@/components/community/MarathonList";
import { boardType } from "@/constants/board";
import { ReactComponent as WriteIcon } from "@/assets/icons/WriteIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<boardType>(boardType.FREE);

  return (
    <div className="mb-24">
      <CommnunityHeader board={board} setBoard={setBoard} />
      <WriteIcon
        className="fixed bottom-[12%] right-[6%] cursor-pointer"
        onClick={() => navigate("/community/write")}
      />
      {board === boardType.MARATHON ? <MarathonList /> : <CommunityList />}
    </div>
  );
};

export default CommunityPage;
