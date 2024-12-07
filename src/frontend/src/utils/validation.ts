export const SignupValidation = ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}): boolean => {
  // 이메일 유효성 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return false;
  }

  // 비밀번호 길이 검사
  if (password.length < 6) {
    return false;
  }

  // 비밀번호 확인 검사
  if (password !== passwordConfirm) {
    return false;
  }

  return true; // 모든 조건을 만족하면 true 반환
};

export const SigninValidation = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): boolean => {
  // 이메일 유효성 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return false;
  }

  // 비밀번호 길이 검사
  if (password.length < 6) {
    return false;
  }

  return true; // 모든 조건을 만족하면 true 반환
};
