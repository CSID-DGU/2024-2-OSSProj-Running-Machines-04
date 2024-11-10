const CrewMemberDetailTitle = () => {
  return (
    <div className="bg-[#f3f3f3] flex items-center justify-between gap-5 px-10 py-5">
      <div>
        <div className="text-[12px] text-[#515151]">
          가입기간 <span className="bg-[#DBF2FF] rounded-md px-[12px]">9m</span>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-[26px] text-[#444] font-semibold">
            머신머신 님의 러닝 기록
          </div>
        </div>
      </div>
      <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://blog.malcang.com/wp-content/uploads/2024/03/1-1.png"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default CrewMemberDetailTitle;
