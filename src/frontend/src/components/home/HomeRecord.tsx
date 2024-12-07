import { ReactComponent as HomeBgImg } from "@/assets/images/HomeBgImg.svg";
import { useUserInfoPost } from "@/hooks/useMypage";

const HomeRecord = () => {
  const { data } = useUserInfoPost();

  return (
    <div className="py-5 flex flex-col justify-center items-center relative border-b-4 border-[#F3F3F3]">
      <HomeBgImg className="absolute top-0 left-0" />
      <div className="flex items-end gap-3">
        <div className="text-[16px]">오늘 달린 거리는</div>
        <div className="bg-signatureGradient text-transparent bg-clip-text text-[50px] font-bold">
          7.43KM
        </div>
      </div>
      <div className="flex items-end gap-3">
        <div className="bg-signatureGradient text-transparent bg-clip-text text-[50px] font-bold">
          7'23"
        </div>
        <div className="text-[16px]">평균 페이스를 기록했어요.</div>
      </div>
      <div className="flex items-end gap-3">
        <div className="text-[16px]">총 활동 시간</div>
        <div className="bg-signatureGradient text-transparent bg-clip-text text-[50px] font-bold">
          1h 23m
        </div>
        <div className="text-[16px]">이에요.</div>
      </div>
    </div>
  );
};

export default HomeRecord;
