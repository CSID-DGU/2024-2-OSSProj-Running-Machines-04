type CrewRankingCardProps = {
  rank: number;
};

const CrewRankingCard = ({ rank }: CrewRankingCardProps) => {
  return (
    <div className="flex justify-between items-center px-8 py-4">
      <div
        className={`${
          rank === 1
            ? "text-[#FFD900]"
            : rank === 2
            ? "text-[#C0BDAC]"
            : "text-[#A89215]"
        } text-[30px] font-bold w-[50px]`}
      >
        {rank}
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col ">
          <div className="text-[#444] text-[18px] font-semibold">
            서울FRC 러닝크루
          </div>
          <div className="text-[18px]">10,239km</div>
        </div>
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2fqdlFDppEAoCuV34aZIe61WnpTwVygxuNMM3szqDMMZRF-dL7jxDKQFBRrXIppNoZ0&usqp=CAU"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CrewRankingCard;
