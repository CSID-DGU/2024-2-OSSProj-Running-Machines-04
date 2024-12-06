import {
  getCalendar,
  getMonthlyStats,
  getRecentStats,
  postUserInfo,
} from "@/apis/mypage";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUserInfoPost = () => {
  return useMutation({
    mutationFn: () => postUserInfo(),
    onSuccess: () => {
      console.log("유저 정보 작성 성공");
    },
    onError: () => {
      console.log("유저 정보 작성 실패");
    },
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
