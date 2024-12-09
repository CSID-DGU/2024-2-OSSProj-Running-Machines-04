import { useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/images/logo.svg";

const Header = () => {
  const { pathname } = useLocation();

  const headerMap = () => {
    if (pathname.includes("/record")) {
      return "기록";
    } else if (pathname.includes("/community")) {
      return "커뮤니티";
    } else if (pathname.includes("/crew")) {
      return "나의 크루";
    } else if (pathname.includes("/mypage")) {
      return "마이페이지";
    } else if (pathname.includes("/other-crew")) {
      return "러닝 크루";
    } else if (pathname.includes("/signin")) {
      return "로그인";
    } else if (pathname.includes("/signup")) {
      return "회원가입";
    } else {
      return "홈";
    }
  };

  return (
    <div className="bg-white h-16 px-5 flex items-center justify-between border-b border-solid border-[#444]">
      <div className="text-[#444] text-lg font-bold">{headerMap()}</div>
      <Logo className="mr-3" />
    </div>
  );
};

export default Header;
