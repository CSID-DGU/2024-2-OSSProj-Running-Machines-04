export type SigninRequest = {
  email: string;
  password: string;
};

export type SigninResponse = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
};
