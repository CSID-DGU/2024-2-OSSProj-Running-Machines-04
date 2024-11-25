export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

export type PreferenceRequest = {
  elevation: string;
  convenience: true;
  nature: true;
  track: string;
};
