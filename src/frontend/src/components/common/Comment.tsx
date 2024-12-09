import { comment } from "@/types/board";
import { Dispatch, SetStateAction } from "react";

type CommentProps = {
  comment: comment;
  selectedComment?: number | null;
  setSelectedComment?: Dispatch<SetStateAction<number | null>>;
};

const Comment = ({
  comment,
  selectedComment,
  setSelectedComment,
}: CommentProps) => {
  const handleClick = (id: number) => {
    if (setSelectedComment) {
      if (selectedComment == id) {
        setSelectedComment(null);
      } else setSelectedComment(id);
    }
  };

  return (
    <div
      onClick={() => handleClick(comment.commentId)}
      className={`flex items-center gap-3 py-4 ${
        selectedComment === comment.commentId ? "bg-[#f7f7f7]" : ""
      }`}
    >
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={comment.writerProfileUrl}
          alt="프로필"
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
