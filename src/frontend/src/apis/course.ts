import { courseResponseParams } from "@/types/course";
import { api } from ".";
import axios from "axios";

export const getRecommendCourseData = async ({
  lat,
  lon,
}: courseResponseParams) => {
  // const response = await axios.get(`http://52.78.82.12:8080/course/recommend`, {
  const response = await api.get(`/course/recommend`, {
    params: { lat, lon },
  });
  return response.data;
};
