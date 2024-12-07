import { comment } from "@/types/board";
import { CrewGalleryDetailResponse } from "@/types/crew";

type CommentProps = {
  comment: comment;
};

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://blog.malcang.com/wp-content/uploads/2024/03/1-1.png"
          alt=""
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[#444] text-[15px]">{comment.writer}</span>
          <span className="text-[#515151] text-[10px]">
            {comment.createdAt.slice(0, 10)}
          </span>
        </div>
        <div className="text-[14px]">{comment.content}</div>
      </div>
    </div>
  );
};

export default Comment;
