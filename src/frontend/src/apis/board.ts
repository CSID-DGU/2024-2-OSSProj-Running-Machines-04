import { boardType } from "@/constants/board";
import { api } from ".";

export const getBoardData = async (boardName: boardType) => {
  const response = await api.get(`/board/${boardName}`);
  return response.data;
};

export const getBoardDetailData = async ({
  boardName,
  postId,
}: {
  boardName: boardType;
  postId: number;
}) => {
  const response = await api.get(`/board/${boardName}/${postId}`);
  return response.data;
};
