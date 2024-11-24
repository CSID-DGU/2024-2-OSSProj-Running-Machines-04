import { SigninValidation } from "@/utils/validation";
import { useEffect, useState } from "react";

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [valid, setValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직 추가
    alert(`이메일: ${email}\n비밀번호: ${password}`);
  };

  useEffect(() => {
    if (SigninValidation({ email, password })) {
      setValid(true);
    }
  }, [email, password]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full px-10 py-14 flex flex-col gap-4"
    >
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
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력해주세요"
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
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해주세요"
          className="text-black border border-gray-300 rounded w-full p-2"
          required
        />
      </div>
      <button
        type="submit"
        className={`fixed bottom-12 ${
          valid ? "bg-[#9993E5]" : "bg-[#D9D9D9]"
        } text-white text-[24px] left-[50%] translate-x-[-50%] font-semibold rounded w-[300px] py-2`}
      >
        로그인
      </button>
    </form>
  );
};

export default SigninPage;
