import { postCourseReview, postRunningRecord } from "@/apis/running";
import useUserCourseIdStore from "@/store/useCourseId";
import useSelectedCourseStore from "@/store/useSelectedCourseStore";
import {
  reviewRequest,
  runningRequest,
  runningResponse,
} from "@/types/running";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// 리뷰 작성
export const useCourseReviewPost = (
  userCourseId: number,
  data: reviewRequest
) => {
  const navigate = useNavigate();
  const { setSelectedCourse } = useSelectedCourseStore();

  return useMutation({
    mutationFn: () => postCourseReview(userCourseId, data),
    onSuccess: () => {
      // 선택된 코스 초기화
      setSelectedCourse(null);

      // 후기 등록 성공 이후 동작
      console.log("리뷰 등록 성공");
      alert("후기가 반영되었습니다!");
      navigate("/");
    },
    onError: () => {
      console.log("리뷰 등록 실패");
    },
  });
};

// 사용자 러닝 기록하기
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
      alert("러닝이 종료되었습니다! 오늘 러닝은 어떠셨나요?");

      setUserCourseId(data.userCourseId);
      navigate(`/record/${id}/review/${data.userCourseId}`);
    },
    onError: () => {
      console.log("러닝 코스 등록 실패");
    },
  });
};
