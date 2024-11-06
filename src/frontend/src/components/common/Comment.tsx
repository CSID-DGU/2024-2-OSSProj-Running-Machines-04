const Comment = () => {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://blog.malcang.com/wp-content/uploads/2024/03/1-1.png"
          alt=""
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[#444] text-[15px]">러미사</span>
          <span className="text-[#515151] text-[10px]">2024년 10월 26일</span>
        </div>
        <div className="text-[14px]">운동복 가성비 좋아요~</div>
      </div>
    </div>
  );
};

export default Comment;
