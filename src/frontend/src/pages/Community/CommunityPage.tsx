import CommnunityHeader from "@/components/community/CommnunityHeader";
import CommunityList from "@/components/community/CommunityList";
import MarathonList from "@/components/community/MarathonList";
import { boardType } from "@/constants/board";
import { ReactComponent as WriteIcon } from "@/assets/icons/WriteIcon.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardGet } from "@/hooks/useBoard";
import { boardResponse } from "@/types/board";
import { dummyCommunityData } from "@/constants/dummy";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<boardType>(boardType.FREE);
  const [boardData, setBoardData] =
    useState<boardResponse[]>(dummyCommunityData);

  const { data } = useBoardGet(board);

  useEffect(() => {
    if (data) {
      setBoardData(data);
    }
  }, [data]);

  return (
    <>
      {data ? (
        <div className="mb-24">
          <CommnunityHeader board={board} setBoard={setBoard} />
          <WriteIcon
            className="fixed bottom-[12%] right-[6%] cursor-pointer"
            onClick={() => navigate("/community/write")}
          />
          {board === boardType.MARATHON ? (
            <MarathonList data={data} />
          ) : (
            <CommunityList data={data} />
          )}
        </div>
      ) : (
        <div>로딩 중입니다.</div>
      )}
    </>
  );
};

export default CommunityPage;
