import { boardDetailResponse } from "@/types/board";

type CommunityDetailInfoProps = {
  data: boardDetailResponse;
};

const CommunityDetailInfo = ({ data }: CommunityDetailInfoProps) => {
  return (
    <div>
      <div className="text-[rgb(68,68,68)] text-[18px] font-semibold">
        {data.title}
      </div>
      <div className="text-[#444] text-[10px]">
        {data.createdAt.slice(0, 10)} | {data.writer}
      </div>
      <div className="flex items-center gap-4 my-5 w-full overflow-scroll">
        {data.postImages.map((image) => (
          <img
            className="object-contain h-[150px] w-[150px]"
            src={image}
            alt="이미지"
          />
        ))}
      </div>
      <div className="text-[#515151] text-[14px]">{data.content}</div>
    </div>
  );
};

export default CommunityDetailInfo;
