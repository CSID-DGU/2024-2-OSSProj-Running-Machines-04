import React from "react";

const MyCrewProfile = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[128px] h-[128px] rounded-full overflow-hidden">
        <img className="w-full h-full object-cover" src="" alt="" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-[18px] font-semibold">서울 FRC 러닝크루</div>
        <div className="flex items-start gap-6">
          <div className="flex flex-col">
            <span className="text-[18px] font-semibold">5</span>
            <span className="text-[12px]">posts</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-semibold">32</span>
            <span className="text-[12px]">members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCrewProfile;
