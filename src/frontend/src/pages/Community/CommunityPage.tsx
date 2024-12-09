import CommnunityHeader from "@/components/community/CommnunityHeader";
import CommunityList from "@/components/community/CommunityList";
import MarathonList from "@/components/community/MarathonList";
import { boardType } from "@/constants/board";
import { ReactComponent as WriteIcon } from "@/assets/icons/WriteIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardGet } from "@/hooks/useBoard";
import Spinner from "@/components/common/Spinner";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<boardType>(boardType.FREE);

  const { data: boardData, isLoading } = useBoardGet(board);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        boardData && (
          <div className="mb-24">
            <CommnunityHeader board={board} setBoard={setBoard} />
            <WriteIcon
              className="fixed bottom-[12%] right-[6%] cursor-pointer"
              onClick={() => navigate("/community/write")}
            />
            {board === boardType.MARATHON ? (
              <MarathonList data={boardData} boardName={board} />
            ) : (
              <CommunityList data={boardData} boardName={board} />
            )}
          </div>
        )
      )}
    </>
  );
};

export default CommunityPage;
