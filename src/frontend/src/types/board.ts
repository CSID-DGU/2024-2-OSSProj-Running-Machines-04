export type boardResponse = {
  postId: number;
  title: string;
  writer: string;
  createdAt: string;
  commentCount: number;
  contentPreview: string;
  postImages: string[];
};

export type boardRequest = {
  boardName: string;
  title: string;
  content: string;
};

export type replies = {
  commentId: number;
  content: string;
  writer: string;
  profileImage?: string;
  createdAt: string;
};

export type comment = {
  commentId: number;
  content: string;
  writer: string;
  profileImage?: string;
  createdAt: string;
  replies?: replies[]; // replies와 타입 통일을 위함
};

export type boardDetailResponse = {
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  comments: comment[];
  board: string;
  postImages: string[];
  postImageIds: number[];
};
