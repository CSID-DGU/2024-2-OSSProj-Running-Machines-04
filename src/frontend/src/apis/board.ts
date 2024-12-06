import { api } from ".";
import { boardRequest, boardResponse } from "@/types/board";

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

export const postBoard = async (data: boardRequest, images: File[]) => {
  const formData = new FormData();
  formData.append("boardName", data.boardName);
  formData.append("title", data.title);
  formData.append("content", data.content);
  images.forEach((image) => {
    formData.append(`images`, image);
  });

  const response = await api.post(`/board/${data.boardName}/post`, formData);
  return response.data;
};

export const searchBoard = async (boardName: string, keyword: string) => {
  const response = await api.post(`/board/${boardName}/search`, keyword);
  return response.data;
};

export const postBoardLike = async (
  boardName: string,
  postId: number,
  commentId: number
) => {
  const response = await api.post(
    `/board/${boardName}/${postId}/${commentId}/like`
  );
  return response.data;
};
