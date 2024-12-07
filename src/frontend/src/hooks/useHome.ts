import { getHomeCrewsData, getHomeData } from "@/apis/home";
import { useQuery } from "@tanstack/react-query";

export const useHomeDataGet = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: () => getHomeData(),
  });
};

export const useHomeCrewsDataGet = () => {
  return useQuery({
    queryKey: ["homeCrews"],
    queryFn: () => getHomeCrewsData(),
  });
};
