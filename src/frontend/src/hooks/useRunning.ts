import { postCourseReview, postRunningRecord } from "@/apis/running";
import { reviewRequest, runningRequest } from "@/types/running";
import { useMutation } from "@tanstack/react-query";

export const useCourseReviewPost = (
  userCourseId: number,
  data: reviewRequest
) => {
  return useMutation({
    mutationFn: () => postCourseReview(userCourseId, data),
    onSuccess: () => {
      console.log("리뷰 등록 성공");
    },
    onError: () => {
      console.log("리뷰 등록 실패");
    },
  });
};

export const useRunningRecordPost = (data: runningRequest) => {
  return useMutation({
    mutationFn: () => postRunningRecord(data),
    onSuccess: () => {
      console.log("러닝 코스 등록 성공");
    },
    onError: () => {
      console.log("러닝 코스 등록 실패");
    },
  });
};
