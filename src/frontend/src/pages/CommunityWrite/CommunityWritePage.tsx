import CommunityWriteHeader from "@/components/communityWrite/CommunityWriteHeader";
import CommunityWriteInput from "@/components/communityWrite/CommunityWriteInput";
import { boardType } from "@/constants/board";
import { useBoardPost } from "@/hooks/useBoard";
import { communityRequestType } from "@/types/communityWrite";
import { useState } from "react";

const CommunityWritePage = () => {
  const [contents, setContents] = useState<communityRequestType>({
    boardName: boardType.FREE,
    title: "",
    content: "",
  });
  const [images, setImages] = useState<File[] | []>([]);

  const { mutate } = useBoardPost(contents, images);

  const handleSubmit = () => {
    console.log(contents, images);
    mutate();
  };

  return (
    <div className="mb-24">
      <CommunityWriteHeader
        contents={contents}
        setContents={setContents}
        onSubmit={handleSubmit}
      />
      <CommunityWriteInput
        contents={contents}
        setContents={setContents}
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default CommunityWritePage;
