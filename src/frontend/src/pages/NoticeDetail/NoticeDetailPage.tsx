import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useNavigate } from "react-router-dom";

const NoticeDetailPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="shadow-sm w-full flex justify-start p-4 mb-6">
        <BackIcon onClick={() => navigate("/crew")} />
      </div>
      <div className="mb-24 px-8">
        <div className="text-[#444] font-semibold text-[32px]">활동 규칙</div>
        <div className="text-[#515151] text-[12px]">
          작성자{"   "}2024.10.19
        </div>
        <div className="text-[#444] text-[18px] mt-8 leading-8">
          1. 필수 <br />
          a. 주 1회 이상 러닝 인증 <br />
          2. 경고 <br />
          a. 필수 규칙 어길 시 경고 1번
          <br />
          3. 강퇴 <br />
          a. 경고 3번이면 강제 퇴장
        </div>
      </div>
    </>
  );
};

export default NoticeDetailPage;
