import { api } from ".";

export const getHomeData = async () => {
  const response = await api.get(`home/user`);
  return response.data;
};

export const getHomeCrewsData = async () => {
  const response = await api.get(`home/crews`);
  return response.data;
};
