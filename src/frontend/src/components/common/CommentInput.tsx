import { Dispatch, SetStateAction } from "react";

type CommentInputProps = {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

const CommentInput = ({ comment, setComment, onSubmit }: CommentInputProps) => {
  return (
    <div className="fixed bottom-0 left-0 z-[200] w-full bg-white border-t border-gray-300 px-4 py-4 flex items-center gap-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="입력해주세요"
        className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;
