export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

export type SignupResponse = {
  accessToken: string;
  refreshToken: string;
  grantType: string;
  accessTokenExpiresIn: number;
};

export type PreferenceRequest = {
  elevation: string;
  convenience: string;
  track: string;
};
