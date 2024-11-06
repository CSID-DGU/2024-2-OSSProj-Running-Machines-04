import CommunityWriteHeader from "@/components/communityWrite/CommunityWriteHeader";
import CommunityWriteInput from "@/components/communityWrite/CommunityWriteInput";
import { boardType } from "@/constants/board";
import {
  communityRequestType,
  initialCommunityRequest,
} from "@/types/communityWrite";
import { useState } from "react";

const CommunityWritePage = () => {
  const [board, setBoard] = useState(boardType.FREE);
  const [contents, setContents] = useState<communityRequestType>(
    initialCommunityRequest
  );

  const handleSubmit = () => {};

  return (
    <div className="mb-24">
      <CommunityWriteHeader
        board={board}
        setBoard={setBoard}
        onSubmit={handleSubmit}
      />
      <CommunityWriteInput contents={contents} setContents={setContents} />
    </div>
  );
};

export default CommunityWritePage;
