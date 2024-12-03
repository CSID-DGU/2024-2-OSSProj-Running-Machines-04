import { postCourseReview, postRunningRecord } from "@/apis/running";
import useUserCourseIdStore from "@/store/useCourseId";
import {
  reviewRequest,
  runningRequest,
  runningResponse,
} from "@/types/running";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

export const useRunningRecordPost = (
  data: runningRequest,
  gpx: File,
  id: number
) => {
  const { setUserCourseId } = useUserCourseIdStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postRunningRecord(data, gpx),
    onSuccess: (data: runningResponse) => {
      console.log("러닝 코스 등록 성공");
      console.log("userCourseId", data.userCourseId);

      setUserCourseId(data.userCourseId);
      navigate(`/record/${id}/review/${data.userCourseId}`);
    },
    onError: () => {
      console.log("러닝 코스 등록 실패");
    },
  });
};
