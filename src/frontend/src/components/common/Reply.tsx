import { ReactComponent as ReplyIcon } from "@/assets/icons/ReplyIcon.svg";
import { comment, replies } from "@/types/board";
import Comment from "./Comment";

type ReplyProps = {
  reply: comment;
};

const Reply = ({ reply }: ReplyProps) => {
  return (
    <div className="ml-4 flex items-center gap-2">
      <ReplyIcon />
      <Comment comment={reply} />
    </div>
  );
};

export default Reply;
