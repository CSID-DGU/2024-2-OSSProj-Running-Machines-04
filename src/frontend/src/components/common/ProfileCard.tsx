const ProfileCard = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://blog.malcang.com/wp-content/uploads/2024/03/1-1.png"
          alt=""
        />
      </div>
      <div>
        <div className="text-[#444] text-[18px] font-medium">러미사</div>
        <div className="text-[#515151] text-[10px]">2024년 10월 26일</div>
      </div>
    </div>
  );
};

export default ProfileCard;
