import CommunityWriteHeader from "@/components/communityWrite/CommunityWriteHeader";
import CommunityWriteInput from "@/components/communityWrite/CommunityWriteInput";
import CrewWriteHeader from "@/components/crewWrite/CrewWriteHeader";
import CrewWriteInput from "@/components/crewWrite/CrewWriteInput";
import { useCrewGalleryPost, useCrewNoticePost } from "@/hooks/useCrew";
import { useState } from "react";

const CrewWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[] | []>([]);
  const [type, setType] = useState("gallery"); // gallery, notice

  // 공지 등록
  const { mutate: noticePost } = useCrewNoticePost(1, {
    title: title,
    content: content,
  });

  // 갤러리 등록
  const { mutate: galleryPost } = useCrewGalleryPost(1, {
    images: images,
    content: content,
  });

  const handleSubmit = () => {
    switch (type) {
      case "gallery":
        console.log(images, content);
        galleryPost();
        break;
      case "notice":
        console.log(title, content);
        noticePost();
        break;
      default:
        alert("게시판을 다시 선택하세요");
    }
  };

  return (
    <div className="mb-24">
      <CrewWriteHeader type={type} setType={setType} onSubmit={handleSubmit} />
      <CrewWriteInput
        type={type}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        setImages={setImages}
      />
    </div>
  );
};

export default CrewWritePage;
