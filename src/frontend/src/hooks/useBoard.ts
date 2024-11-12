import { getBoardData, getBoardDetailData } from "@/apis/board";
import { boardType } from "@/constants/board";
import { useQuery } from "@tanstack/react-query";

export const useBoardGet = (boardName: boardType) => {
  return useQuery({
    queryKey: ["board", boardName],
    queryFn: () => getBoardData(boardName),
  });
};

export const useBoardDetailGet = ({
  boardName,
  postId,
}: {
  boardName: boardType;
  postId: number;
}) => {
  return useQuery({
    queryKey: ["board", boardName, "postId", postId],
    queryFn: () => getBoardDetailData({ boardName, postId }),
  });
};
