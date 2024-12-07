import Comment from "@/components/common/Comment";
import Reply from "@/components/common/Reply";
import { comment } from "@/types/board";
import { Dispatch, SetStateAction } from "react";

type CommentsListProps = {
  comments: comment[];
  selectedComment: number | null;
  setSelectedComment: Dispatch<SetStateAction<number | null>>;
};

const CommentsList = ({
  comments,
  selectedComment,
  setSelectedComment,
}: CommentsListProps) => {
  return (
    <div>
      {comments.map((comment) => (
        <>
          <Comment
            key={comment.commentId}
            comment={comment}
            setSelectedComment={setSelectedComment}
            selectedComment={selectedComment}
          />
          {comment.replies &&
            comment.replies.map((reply) => <Reply reply={reply} />)}
        </>
      ))}
    </div>
  );
};

export default CommentsList;
