import { ReactComponent as HomeIcon } from "@/assets/icons/HomeIcon.svg";
import { ReactComponent as RecordIcon } from "@/assets/icons/RecordIcon.svg";
import { ReactComponent as CommunityIcon } from "@/assets/icons/CommunityIcon.svg";
import { ReactComponent as CrewIcon } from "@/assets/icons/CrewIcon.svg";
import { ReactComponent as MypageIcon } from "@/assets/icons/MypageIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getIconColor = (path: string) => {
    // 홈 경로 처리
    if (path === "/" && location.pathname === "/") return "#9993E5";

    // 그 외 뎁스 페이지까지 경로 처리
    if (path !== "/" && location.pathname.startsWith(path)) return "#9993E5";

    // 해당 경로가 아닐 경우 기본 색상
    return "black";
  };

  return (
    <div className="z-50 bg-white fixed bottom-0 left-0 w-full flex justify-around py-4 shadow-navbarShadow">
      <div
        onClick={() => navigate("/")}
        className="flex flex-col items-center justify-center gap-1"
      >
        <HomeIcon fill={getIconColor("/")} />
        <div className="text-[8px]">홈</div>
      </div>
      <div
        onClick={() => navigate("/record")}
        className="flex flex-col items-center justify-center gap-1"
      >
        <RecordIcon fill={getIconColor("/record")} />
        <div className="text-[8px]">기록</div>
      </div>
      <div
        onClick={() => navigate("/community/free")}
        className="flex flex-col items-center justify-center gap-1"
      >
        <CommunityIcon fill={getIconColor("/community")} />
        <div className="text-[8px]">커뮤니티</div>
      </div>
      <div
        onClick={() => navigate("/crew")}
        className="flex flex-col items-center justify-center gap-1"
      >
        <CrewIcon fill={getIconColor("/crew")} />
        <div className="text-[8px]">나의 크루</div>
      </div>
      <div
        onClick={() => navigate("/mypage")}
        className="flex flex-col items-center justify-center gap-1"
      >
        <MypageIcon stroke={getIconColor("/mypage")} />
        <div className="text-[8px]">마이페이지</div>
      </div>
    </div>
  );
};

export default Navbar;
