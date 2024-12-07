import { useCrewMemberGet } from "@/hooks/useCrew";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

const CrewMemberTitle = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCrewMemberGet(1);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div
            onClick={() => navigate(-1)}
            className="flex justify-between items-center p-6"
          >
            <div className="w-[50px]">〈</div>
            <div className="w-full flex gap-3 justify-between items-center">
              <div className="text-[18px] font-semibold">{data.crewTitle}</div>
              <div className="flex items-start gap-6">
                <div className="flex flex-col">
                  <span className="text-[18px] font-semibold">
                    {data.postCount}
                  </span>
                  <span className="text-[12px]">posts</span>
                </div>
                <div className="flex flex-col cursor-pointer">
                  <span className="text-[18px] font-semibold">
                    {data.memberCount}
                  </span>
                  <span className="text-[12px]">members</span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default CrewMemberTitle;
