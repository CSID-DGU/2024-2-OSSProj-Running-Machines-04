import { courseResponseParams } from "@/types/course";
import { api } from ".";

export const postCourseBookmark = async (courseId: number) => {
  const response = await api.post(`/course/${courseId}`);
  return response.data;
};

// TODO: data 형식 수정
export const uploadGpx = async (data: number) => {
  const response = await api.post(`/course/uploadGpx`, { data });
  return response.data;
};

export const getRecommendCourseData = async ({
  lat,
  lon,
}: courseResponseParams) => {
  const response = await api.get(`/course/recommend`, {
    params: { lat, lon },
  });
  return response.data;
};

export const getPopularCourseData = async () => {
  const response = await api.get(`/course/popular`);
  return response.data;
};

export const getLikesCourseData = async () => {
  const response = await api.get(`/course/likes`);
  return response.data;
};

export const getAllCourseData = async () => {
  const response = await api.get(`/course/getAllCourse`);
  return response.data;
};
