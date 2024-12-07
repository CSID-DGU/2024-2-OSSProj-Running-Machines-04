import { homePaceRankingResponse, homeRankingResponse } from "@/types/home";

type CrewRankingCardProps = {
  index: number;
  paceData?: homePaceRankingResponse;
  distanceData?: homeRankingResponse;
};

const CrewRankingCard = ({
  index,
  paceData,
  distanceData,
}: CrewRankingCardProps) => {
  return (
    <>
      {paceData && (
        <div className="flex justify-between items-center px-8 py-4">
          <div
            className={`${
              index === 1
                ? "text-[#FFD900]"
                : index === 2
                ? "text-[#C0BDAC]"
                : "text-[#A89215]"
            } text-[30px] font-bold w-[50px]`}
          >
            {index}
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col ">
              <div className="text-[#444] text-[18px] font-semibold">
                {paceData.title}
              </div>
              <div className="text-[18px]">{paceData.averagePace}</div>
            </div>
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={paceData.image}
                alt="사진"
              />
            </div>
          </div>
        </div>
      )}
      {distanceData && (
        <div className="flex justify-between items-center px-8 py-4">
          <div
            className={`${
              index === 1
                ? "text-[#FFD900]"
                : index === 2
                ? "text-[#C0BDAC]"
                : "text-[#A89215]"
            } text-[30px] font-bold w-[50px]`}
          >
            {index}
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col ">
              <div className="text-[#444] text-[18px] font-semibold">
                {distanceData.title}
              </div>
              <div className="text-[18px]">{distanceData.distance}</div>
            </div>
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={distanceData.image}
                alt="사진"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrewRankingCard;
