import { boardType } from "@/constants/board";
import { api } from ".";
import { boardResponse } from "@/types/board";

export const getBoardData = async (
  boardName: string
): Promise<boardResponse[]> => {
  const response = await api.get(`/board/${boardName}`);
  return response.data;
};

export const getBoardDetailData = async ({
  boardName,
  postId,
}: {
  boardName: string;
  postId: number;
}) => {
  const response = await api.get(`/board/${boardName}/${postId}`);
  return response.data;
};
