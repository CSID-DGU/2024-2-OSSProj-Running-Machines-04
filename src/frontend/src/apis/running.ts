import { reviewRequest, runningRequest } from "@/types/running";
import { api } from ".";

export const postCourseReview = async (
  userCourseId: number,
  data: reviewRequest
) => {
  const response = await api.post(`/running/review/${userCourseId}`, data);
  return response.data;
};

export const postRunningRecord = async (
  data: runningRequest,
  gpxFile: File
) => {
  const formData = new FormData();
  console.log(data);
  console.log(gpxFile);

  formData.append("userCourseRequestDto", JSON.stringify(data));
  formData.append("gpx", gpxFile);

  try {
    const response = await api.post("/running/record", formData);
    return response.data;
  } catch (error) {
    console.error("코스 생성 실패", error);
    throw error;
  }
};
