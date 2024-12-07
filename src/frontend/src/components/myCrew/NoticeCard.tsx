import { noticePostType } from "@/types/crew";
import { useNavigate } from "react-router-dom";

type NoticeCardProps = {
  post: noticePostType;
};

const NoticeCard = ({ post }: NoticeCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/crew/notice/${post.crewPostId}`)}
      className="w-full relative rounded-md flex items-center px-6 bg-slate-100"
    >
      <div className="absolute top-3 left-4 text-[10px] font-medium">
        작성자{" "}
        <span className="text-[#9993e5] font-semibold">{post.author}</span>
      </div>
      <div className="py-8">
        <div className="text-[14px] text-[#444] font-medium">
          서울 FRC 러닝크루
        </div>
        <div className="text-[22px] font-semibold">{post.title}</div>
      </div>
      <div className="absolute bottom-3 right-4 text-[10px] font-medium">
        수정일 {post.lastModified.slice(0, 10)}
      </div>
    </div>
  );
};

export default NoticeCard;
