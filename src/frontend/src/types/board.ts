import { boardType } from "@/constants/board";

export type boardResponse = {
  title: string;
  writer: string;
  createdAt: string;
  commentCount: number;
};

export type replies = {
  commentId: number;
  content: string;
  writer: string;
  createdAt: string;
};

export type comment = {
  commentId: number;
  content: string;
  writer: string;
  createdAt: string;
  replies: replies[];
};

export type boardDetailResponse = {
  postId: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  comments: comment[];
};
