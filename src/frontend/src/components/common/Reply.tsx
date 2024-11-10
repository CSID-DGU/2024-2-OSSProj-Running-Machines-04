import { ReactComponent as ReplyIcon } from "@/assets/icons/ReplyIcon.svg";
import Comment from "@/components/common/Comment";

const Reply = () => {
  return (
    <div className="ml-4 flex items-center gap-2">
      <ReplyIcon />
      <Comment />
    </div>
  );
};

export default Reply;
