export type MypageResponse = {
  nickName: string;
  profileImageUrl: string;
  elevation: string;
  convenience: string;
  track: string;
};

export type MypageCalendarResponse = {
  date: string;
  totalDistance: number;
};

export type MypageMonthlyResponse = {
  distance: number;
  duration: number;
  pace: number;
};

export type MypageRecentResponse = {
  distance: number;
  duration: number;
  pace: number;
  tags: string[];
  createdAt: string;
};
