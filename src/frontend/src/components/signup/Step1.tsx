import { SignupRequest } from "@/types/signup";
import { SignupValidation } from "@/utils/validation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Step1Props = {
  signupData: SignupRequest;
  onInputChange: (key: keyof SignupRequest, value: string) => void;
  setValid: Dispatch<SetStateAction<boolean>>;
};

const Step1 = ({ signupData, onInputChange, setValid }: Step1Props) => {
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  // 유효성 검사 실행
  useEffect(() => {
    const isValid = SignupValidation({ ...signupData, passwordConfirm });
    setValid(isValid);
  }, [signupData, passwordConfirm, setValid]);

  return (
    <div className="relative w-full px-10 py-14 flex flex-col gap-4">
      <div className="w-full mb-4">
        <label
          htmlFor="email"
          className="block text-start text-[#999] text-[15px] mb-3"
        >
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={signupData.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          placeholder="이메일을 입력해주세요"
          className="text-black border border-gray-300 rounded w-full p-2"
          required
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="nickname"
          className="block text-start text-[#999] text-[15px] mb-3"
        >
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={signupData.nickname}
          onChange={(e) => onInputChange("nickname", e.target.value)}
          placeholder="사용할 닉네임을 입력해주세요"
          className="text-black border border-gray-300 rounded w-full p-2"
          required
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="password"
          className="block text-start text-[#999] text-[15px] mb-3"
        >
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={signupData.password}
          onChange={(e) => onInputChange("password", e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className="text-black border border-gray-300 rounded w-full p-2"
          required
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="passwordConfirm"
          className="block text-start text-[#999] text-[15px] mb-3"
        >
          비밀번호 확인
        </label>
        <input
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호를 다시 입력해주세요"
          className="text-black border border-gray-300 rounded w-full p-2"
          required
        />
      </div>
    </div>
  );
};

export default Step1;
