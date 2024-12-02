import {
  getAllCourseData,
  getLikesCourseData,
  getRecommendCourseData,
  postCourseBookmark,
  uploadGpx,
} from "@/apis/course";
import { courseResponseParams } from "@/types/course";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useRecommendCourseGet = ({ lat, lon }: courseResponseParams) => {
  return useQuery({
    queryKey: ["course", lat, lon],
    queryFn: () => getRecommendCourseData({ lat, lon }),
  });
};

export const useLikesCourseGet = () => {
  return useQuery({
    queryKey: ["like", "course"],
    queryFn: getLikesCourseData,
  });
};

export const useAllCourseCourseGet = () => {
  return useQuery({
    queryKey: ["all", "course"],
    queryFn: getAllCourseData,
  });
};
