import { CrewGalleryDetaiCommentslResponse } from "@/types/crew";

type GalleryCommentProps = {
  comment: CrewGalleryDetaiCommentslResponse;
};

const GalleryComment = ({ comment }: GalleryCommentProps) => {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={comment.authorProfile}
          alt="프로필"
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[#444] text-[15px]">{comment.authorName}</span>
          <span className="text-[#515151] text-[10px]">
            {comment.createdAt.slice(0, 10)}
          </span>
        </div>
        <div className="text-[14px]">{comment.content}</div>
      </div>
    </div>
  );
};

export default GalleryComment;
