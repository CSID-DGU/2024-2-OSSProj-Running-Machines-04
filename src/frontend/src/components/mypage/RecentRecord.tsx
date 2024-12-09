import { MypageRecentResponse } from "@/types/mypage";

type RecentRecordProps = {
  record: MypageRecentResponse;
};

const RecentRecord = ({ record }: RecentRecordProps) => {
  return (
    <div className="px-10 py-3 border-b border-[#DFDFDF]">
      <div className="flex gap-2 mb-2">
        {record.tags.map((tag) => (
          <div className="min-w-10 text-center bg-[#B1FF8C] rounded p-1 text-[#444] text-[8px]">
            {tag}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-black text-[22px] font-semibold">
            {record.distance.toFixed(2)}km
          </div>
          <div className="text-[#999] text-[16px]">총 거리</div>
        </div>
        <div>
          <div className="text-black text-[22px] font-semibold">
            {record.duration}분
          </div>
          <div className="text-[#999] text-[16px]">소요 시간</div>
        </div>
        <div>
          <div className="text-black text-[22px] font-semibold">
            {record.pace}'00"
          </div>
          <div className="text-[#999] text-[16px]">평균 페이스</div>
        </div>
      </div>
      <div className="mt-2 w-full text-[10px] text-end font-light">
        {record.createdAt.split("T")[0]}{" "}
        {record.createdAt.split("T")[1].slice(0, 5)}
      </div>
    </div>
  );
};

export default RecentRecord;
