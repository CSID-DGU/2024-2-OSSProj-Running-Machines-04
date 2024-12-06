import {
  getAllCourseData,
  getLikesCourseData,
  getPopularCourseData,
  getRecommendCourseData,
  postCourseBookmark,
  uploadGpx,
} from "@/apis/course";
import { courseResponseParams } from "@/types/course";
import { useMutation, useQuery } from "@tanstack/react-query";

// 코스 즐겨찾기(등록/취소)
export const useCourseBookmarkPost = (courseId: number) => {
  return useMutation({
    mutationFn: () => postCourseBookmark(courseId),
    onSuccess: () => {
      console.log("즐겨찾기 등록 성공");
    },
    onError: () => {
      console.log("즐겨찾기 등록 실패");
    },
  });
};

// 관리자 코스 등록
export const useUploadGpx = (data: number) => {
  return useMutation({
    mutationFn: () => uploadGpx(data),
    onSuccess: () => {
      console.log("GPX 등록 성공");
    },
    onError: () => {
      console.log("GPX 등록 실패");
    },
  });
};

// 추천 코스 목록 조회
export const useRecommendCourseGet = ({ lat, lon }: courseResponseParams) => {
  return useQuery({
    queryKey: ["course", lat, lon],
    queryFn: () => getRecommendCourseData({ lat, lon }),
  });
};

// 인기 코스 목록 조회
export const usePopularCourseGet = () => {
  return useQuery({
    queryKey: ["popular", "course"],
    queryFn: getPopularCourseData,
  });
};

// 즐겨찾기 코스 목록 조회
export const useLikesCourseGet = () => {
  return useQuery({
    queryKey: ["like", "course"],
    queryFn: getLikesCourseData,
  });
};

// 전체 코스 목록 조회
export const useAllCourseCourseGet = () => {
  return useQuery({
    queryKey: ["all", "course"],
    queryFn: getAllCourseData,
  });
};
