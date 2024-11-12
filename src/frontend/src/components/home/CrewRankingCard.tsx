import { homeFaceRankingResponse, homeRankingResponse } from "@/types/home";

type CrewRankingCardProps = {
  type: string; // face or distance
  faceData?: homeFaceRankingResponse;
  distanceData?: homeRankingResponse;
};

const CrewRankingCard = ({
  type,
  faceData,
  distanceData,
}: CrewRankingCardProps) => {
  return (
    <>
      {faceData && (
        <div className="flex justify-between items-center px-8 py-4">
          <div
            className={`${
              faceData.rank === 1
                ? "text-[#FFD900]"
                : faceData.rank === 2
                ? "text-[#C0BDAC]"
                : "text-[#A89215]"
            } text-[30px] font-bold w-[50px]`}
          >
            {faceData.rank}
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col ">
              <div className="text-[#444] text-[18px] font-semibold">
                {faceData.crewName}
              </div>
              <div className="text-[18px]">{faceData.face}</div>
            </div>
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={faceData.profileImage}
                alt=""
              />
              {/* <img
            className="w-full h-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2fqdlFDppEAoCuV34aZIe61WnpTwVygxuNMM3szqDMMZRF-dL7jxDKQFBRrXIppNoZ0&usqp=CAU"
            alt=""
          /> */}
            </div>
          </div>
        </div>
      )}
      {distanceData && (
        <div className="flex justify-between items-center px-8 py-4">
          <div
            className={`${
              distanceData.rank === 1
                ? "text-[#FFD900]"
                : distanceData.rank === 2
                ? "text-[#C0BDAC]"
                : "text-[#A89215]"
            } text-[30px] font-bold w-[50px]`}
          >
            {distanceData.rank}
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col ">
              <div className="text-[#444] text-[18px] font-semibold">
                {distanceData.crewName}
              </div>
              <div className="text-[18px]">{distanceData.distance}km</div>
            </div>
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={distanceData.profileImage}
                alt=""
              />
              {/* <img
            className="w-full h-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2fqdlFDppEAoCuV34aZIe61WnpTwVygxuNMM3szqDMMZRF-dL7jxDKQFBRrXIppNoZ0&usqp=CAU"
            alt=""
          /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrewRankingCard;
