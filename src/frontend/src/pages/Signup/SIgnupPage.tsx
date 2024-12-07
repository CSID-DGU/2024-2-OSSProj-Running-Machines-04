import Step1 from "@/components/signup/Step1";
import Step2 from "@/components/signup/Step2";
import Step3 from "@/components/signup/Step3";
import Step4 from "@/components/signup/Step4";
import { useSignup } from "@/hooks/useAuth";
import { SignupRequest } from "@/types/signup";
import { useState } from "react";

const SignupPage = () => {
  const [step, setStep] = useState<number>(1); // 1~6
  const [valid, setValid] = useState(false); // 유효성 상태

  const [signupData, setSignupData] = useState<SignupRequest>({
    email: "",
    password: "",
    nickname: "",
  });
  const [image, setImage] = useState<File | null>(null); // 프로필 사진

  const { mutate: signup } = useSignup();

  // 입력값 변경 핸들러
  const handleInputChange = (key: keyof SignupRequest, value: string) => {
    setSignupData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    if (step == 1) {
      // 이메일, 비밀번호 입력
      if (!valid) {
        alert("입력값이 유효하지 않습니다. 다시 확인해주세요.");
        return;
      }
      console.log("회원가입 데이터:", signupData);
      setStep(step + 1);
    }
    if (step == 2) {
      console.log(image, signupData);
      if (image) {
        signup({ data: signupData, image });
      } else signup({ data: signupData });
      setStep(step + 1);
    }

    // onSuccess
    setStep(step + 1);
  };

  return (
    <div className="signup-page">
      {step == 1 && (
        <Step1
          signupData={signupData}
          onInputChange={handleInputChange}
          setValid={setValid}
        />
      )}
      {step == 2 && <Step2 setImage={setImage} setValid={setValid} />}
      {step == 3 && <Step3 setStep={setStep} />}
      {step == 4 && <Step4 />}
      {step < 3 && (
        <button
          type="submit"
          onClick={handleSubmit}
          className={`fixed bottom-12 ${
            valid ? "bg-[#9993E5]" : "bg-[#D9D9D9]"
          } text-white text-[24px] left-[50%] translate-x-[-50%] font-semibold rounded w-[300px] py-2`}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default SignupPage;
