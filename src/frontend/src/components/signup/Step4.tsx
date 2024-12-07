import { ReactComponent as BigLogo } from "@/assets/icons/BigLogo.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step4 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <div className="bg-columnSignatureGradient h-screen w-screen max-w-[430px] flex flex-col gap-14 justify-center items-center text-[#444] text-[20px] font-bold">
        <BigLogo />
        레디투런에 오신 것을 환영해요!
      </div>
    </div>
  );
};

export default Step4;
