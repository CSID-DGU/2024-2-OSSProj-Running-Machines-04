import { courseResponseParams } from "@/types/course";
import { api } from ".";

export const getRecommendCourseData = async ({
  lat,
  lon,
}: courseResponseParams) => {
  const response = await api.get(`/course/recommend`, {
    params: { lat, lon },
  });
  return response.data;
};
