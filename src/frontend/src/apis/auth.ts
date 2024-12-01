import { PreferenceRequest, SignupRequest } from "@/types/signup";
import { api, apiWithoutAuth } from ".";
import { SigninRequest, SigninResponse } from "@/types/signin";

export const signup = async (data: SignupRequest, image?: File) => {
  const signupData = new FormData();

  signupData.append("userSignupRequestDto", JSON.stringify(data));

  if (image) {
    signupData.append("image", image);
  }

  const response = await apiWithoutAuth.post("/auth/signup", signupData);
  return response.data;
};

export const signin = async (data: SigninRequest): Promise<SigninResponse> => {
  const response = await apiWithoutAuth.post("/auth/login", data);
  return response.data;
};

export const preferencePost = async (data: PreferenceRequest) => {
  const response = await api.post("/user/preference", data);
  return response.data;
};
