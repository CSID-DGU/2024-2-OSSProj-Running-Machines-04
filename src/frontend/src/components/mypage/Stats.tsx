import { useMonthlyStatsGet } from "@/hooks/useMypage";
import { useState } from "react";
import Spinner from "../common/Spinner";

const Stats = () => {
  const [period, setPeriod] = useState("week");

  const { data, isLoading } = useMonthlyStatsGet(period);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div>
            <div className="mt-12 mb-10 mx-10 w-fit bg-white flex rounded-xl border border-[#919191]">
              <div
                onClick={() => setPeriod("week")}
                className={`${
                  period == "week" && "bg-[#D9D9D9]"
                } rounded-xl flex justify-center items-center w-24 py-2`}
              >
                W
              </div>
              <div
                onClick={() => setPeriod("month")}
                className={`${
                  period == "month" && "bg-[#D9D9D9]"
                } rounded-xl flex justify-center items-center w-24 py-2`}
              >
                M
              </div>
            </div>
            <div className="px-10 flex items-center justify-between">
              <div>
                <div className="text-black text-[28px] font-medium">
                  {data.distance.toFixed(2)}km
                </div>
                <div className="text-[#999] text-[16px]">평균 거리</div>
              </div>
              <div>
                <div className="text-black text-[28px] font-medium">
                  {data.duration}MIN
                </div>
                <div className="text-[#999] text-[16px]">시간</div>
              </div>
              <div>
                <div className="text-black text-[28px] font-medium">
                  {data.pace}
                </div>
                <div className="text-[#999] text-[16px]">평균 페이스</div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Stats;
