import { reviewRequest, runningRequest } from "@/types/running";
import { api } from ".";

export const postCourseReview = async (
  userCourseId: number,
  data: reviewRequest
) => {
  const response = await api.post(`/running/review/${userCourseId}`, { data });
  return response.data;
};

export const postRunningRecord = async (data: runningRequest) => {
  const response = await api.post(`/running/record`, { data });
  return response.data;
};
