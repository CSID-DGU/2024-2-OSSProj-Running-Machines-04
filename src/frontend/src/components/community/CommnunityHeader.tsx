import { useLocation, useNavigate } from "react-router-dom";

const CommnunityHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getFontColor = (path: string) =>
    location.pathname === path ? "text-[#9993E5]" : "text-black";

  return (
    <div className="flex p-5 shadow-searchbarShadow justify-between">
      <div
        onClick={() => navigate("/community/free")}
        className={`${getFontColor(
          "/community/free"
        )} text-[14px] font-semibold`}
      >
        자유 게시판
      </div>
      <div
        onClick={() => navigate("/community/run-together")}
        className={`${getFontColor(
          "/community/run-together"
        )} text-[14px] font-semibold`}
      >
        함께 달려요
      </div>
      <div
        onClick={() => navigate("/community/recommend-shoes")}
        className={`${getFontColor(
          "/community/recommend-shoes"
        )} text-[14px] font-semibold`}
      >
        러닝화 추천
      </div>
      <div
        onClick={() => navigate("/community/marathon-schedule")}
        className={`${getFontColor(
          "/community/marathon-schedule"
        )} text-[14px] font-semibold`}
      >
        마라톤 일정
      </div>
    </div>
  );
};

export default CommnunityHeader;
