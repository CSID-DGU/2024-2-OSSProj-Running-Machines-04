const NoticeCard = () => {
  return (
    <div className="w-full relative rounded-md flex items-center px-6 bg-slate-100">
      <div className="absolute top-3 left-4 text-[10px] font-medium">
        작성자 <span className="text-[#9993e5] font-semibold">크루 리더</span>
      </div>
      <div className="py-8">
        <div className="text-[14px] text-[#444] font-medium">
          서울 FRC 러닝크루
        </div>
        <div className="text-[22px] font-semibold">활동 규칙</div>
      </div>
      <div className="absolute bottom-3 right-4 text-[10px] font-medium">
        수정일 2024.10.14
      </div>
    </div>
  );
};

export default NoticeCard;
