import {
  MypageCalendarResponse,
  MypageMonthlyResponse,
  MypageRecentResponse,
  MypageResponse,
} from "@/types/mypage";
import { api } from ".";

export const getUserInfo = async (): Promise<MypageResponse> => {
  const response = await api.get(`/mypage/userInfo`);
  return response.data;
};

export const getCalendar = async (
  year: number,
  month: number
): Promise<MypageCalendarResponse> => {
  const response = await api.get(`/mypage/${year}/${month}`);
  return response.data;
};

// 주, 월별 통계
export const getMonthlyStats = async (
  period: string
): Promise<MypageMonthlyResponse> => {
  const response = await api.get(`/mypage/stats`, {
    params: { period },
  });
  return response.data;
};

// 최근 기록 2개
export const getRecentStats = async (): Promise<MypageRecentResponse[]> => {
  const response = await api.get(`/mypage/recent`);
  return response.data;
};
