import { preferencePost, signin, signup } from "@/apis/auth";
import { SigninResponse } from "@/types/signin";
import {
  PreferenceRequest,
  SignupRequest,
  SignupResponse,
} from "@/types/signup";
import { setAccessToken, setRefreshToken } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  return useMutation({
    mutationFn: ({ data, image }: { data: SignupRequest; image?: File }) =>
      signup(data, image),
    onSuccess: (data: SignupResponse) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      console.log("회원가입 성공");
    },
    onError: (error) => {
      console.error("회원가입 오류", error);
    },
  });
};

export const usePreferencePost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: PreferenceRequest) => preferencePost(data),
    onSuccess: () => {
      console.log("선호도 입력 성공");
      navigate("/signin");
    },
    onError: (error) => {
      console.error("선호도 입력 오류", error);
    },
  });
};

export const useSignin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signin,
    onSuccess: (data: SigninResponse) => {
      if (data.accessToken && data.refreshToken) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/");
      }
    },
    onError: () => {
      navigate("/signin");
    },
  });
};
