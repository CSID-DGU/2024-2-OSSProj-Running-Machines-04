const CommunityCard = () => {
  return (
    <div className="px-8 py-6 flex items-center justify-between border-b border-[#DFDFDF]">
      <div className="flex flex-col">
        <div className="text-[18px] text-[#444] font-semibold">
          러닝 고수님들!!
        </div>
        <div className="mb-3 text-[#444] text-[10px]">
          2024.09.30 | 러닝고수
        </div>
        <div className="text-[14px] text-[#515151]">
          입문용 러닝복 추천점요,,
        </div>
      </div>
      <div className="w-[70px] h-[4.375rem] overflow-hidden">
        <img className="w-full h-full object-cover" src="" alt="" />
      </div>
    </div>
  );
};

export default CommunityCard;
