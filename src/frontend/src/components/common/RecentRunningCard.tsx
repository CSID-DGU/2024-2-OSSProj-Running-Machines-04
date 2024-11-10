const RecentRunningCard = () => {
  return (
    <div className="flex p-6 gap-5 items-center">
      <div className="w-[88px] h-[100px] bg-[#f0f0f0] flex justify-center items-center">
        <img
          src="https://play-lh.googleusercontent.com/pPTTNz433EYFurg2j__bFU5ONdMoU_bs_-yS2JLZriua3iHrksGP6XBPF5VtDPlpGcW4"
          alt=""
        />
      </div>
      <div>
        <div className="text-[10px]">2024.10.01 19:45</div>
        <div className="text-[16px] mb-3">서울특별시 중구</div>
        <div className="flex gap-[30px]">
          <div className="flex flex-col">
            <div className="text-[12px]">5.59</div>
            <div className="text-[10px] text-[#7a7a7a]">Km</div>
          </div>
          <div className="flex flex-col">
            <div className="text-[12px]">12'59"</div>
            <div className="text-[10px] text-[#7a7a7a]">Avg.Pace</div>
          </div>
          <div className="flex flex-col">
            <div className="text-[12px]">1:12:36</div>
            <div className="text-[10px] text-[#7a7a7a]">Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentRunningCard;
