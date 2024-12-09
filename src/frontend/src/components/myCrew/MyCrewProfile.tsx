import { useCrewMemberGet } from "@/hooks/useCrew";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

const MyCrewProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCrewMemberGet(1);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div className="py-6 px-10 flex items-center justify-between">
            <div className="max-w-[110px] w-[30vw] max-h-[110px] h-[30vw] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://blog.mealligram.com/wp-content/uploads/2024/03/1.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[18px] font-semibold">{data.crewTitle}</div>
              <div className="flex items-start gap-6">
                <div className="flex flex-col">
                  <span className="text-[18px] font-semibold">
                    {data.postCount}
                  </span>
                  <span className="text-[12px]">posts</span>
                </div>
                <div
                  onClick={() => navigate("/crew/members")}
                  className="flex flex-col cursor-pointer"
                >
                  <span className="text-[18px] font-semibold">
                    {data.memberCount}
                  </span>
                  <span className="text-[12px]">members</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/crew/chat")}
                className="w-full text-center py-1 border border-[#D9D9D9] text-[1rem] rounded-lg shadow-sm"
              >
                채팅
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MyCrewProfile;
