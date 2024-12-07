import Comment from "@/components/common/Comment";
import Reply from "@/components/common/Reply";
import { comment } from "@/types/board";

type CommentsListProps = {
  comments: comment[];
};

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
      {/* <Reply /> */}
    </div>
  );
};

export default CommentsList;
