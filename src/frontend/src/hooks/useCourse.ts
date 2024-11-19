import { getRecommendCourseData } from "@/apis/course";
import { courseResponseParams } from "@/types/course";
import { useQuery } from "@tanstack/react-query";

export const useRecommendCourseGet = ({ lat, lon }: courseResponseParams) => {
  return useQuery({
    queryKey: ["course", lat, lon],
    queryFn: () => getRecommendCourseData({ lat, lon }),
  });
};
