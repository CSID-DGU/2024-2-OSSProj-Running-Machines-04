import { Post } from "@/types/crew";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type GalleryCardProps = {
  post: Post;
  otherCrew?: boolean;
};
const GalleryCard = ({ post, otherCrew }: GalleryCardProps) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => !otherCrew && navigate(`/crew/gallery/${post.postId}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-[33vw] h-[33vw] flex justify-center items-center p-4"
    >
      <img
        className="absolute left-0 top-0 w-full h-full"
        src={post.imageUrl}
        alt="사진"
      />
      {hover && (
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] text-white p-4 text-sm overflow-hidden">
          {post.content}
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
