import {
  getCalendar,
  getMonthlyStats,
  getRecentStats,
  getUserInfo,
} from "@/apis/mypage";
import { useQuery } from "@tanstack/react-query";

export const useUserInfoGet = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
  });
};

export const useCalendarGet = (year: number, month: number) => {
  return useQuery({
    queryKey: ["calendar", year, month],
    queryFn: () => getCalendar(year, month),
  });
};

export const useMonthlyStatsGet = (period: string) => {
  return useQuery({
    queryKey: ["momthlyStats", period],
    queryFn: () => getMonthlyStats(period),
  });
};

export const useRecentStatsGet = () => {
  return useQuery({
    queryKey: ["recentStats"],
    queryFn: () => getRecentStats(),
  });
};
