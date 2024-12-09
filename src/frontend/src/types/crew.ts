import { MypageCalendarResponse } from "./mypage";

export type noticePostType = {
  crewPostId: number;
  title: string;
  author: string;
  lastModified: string;
};

export type CrewNoticeResponse = {
  crewTitle: string;
  crewProfileImage: string;
  postCount: number;
  memberCount: number;
  noticePost: noticePostType[];
};

export type CrewNoticeRequest = {
  title: string;
  content: string;
};

export type CrewNoticeDetailResponse = {
  title: string;
  content: string;
  author: string;
  crewName: string;
  createdDate: string;
};

export type CrewJoinResponse = {
  passcode: number;
};

export type CrewCreateRequest = {
  certificationImage: File;
  profileImage: File;
};

export type CrewResponse = {
  crewId: number;
  profileImageUrl: string;
  title: string;
  memberCount: number;
};

export type Member = {
  userId: number;
  name: string;
  profileUrl: string;
  membershipDuration: string;
  role: string;
};

export type CrewMemberResponse = {
  crewTitle: string;
  postCount: number;
  memberCount: number;
  members: Member[];
};

export type recentRunsType = {
  distance: number;
  duration: number;
  pace: number;
  tags: string[];
  createdAt: string;
};

export type CrewMemberDetailResponse = {
  crewTitle: string;
  postCount: number;
  memberCount: number;
  members: Member[];
  userDistance: MypageCalendarResponse[];
  recentRuns: recentRunsType[];
};

export type Post = {
  postId: number;
  imageUrl: string;
  content: string;
};

export type CrewGalleryResponse = {
  crewTitle: string;
  postCount: number;
  memberCount: number;
  posts: Post[];
};

export type CrewGalleryDetailResponse = {
  postId: number;
  authorNickName: string;
  authorProfileUrl: string;
  createdAt: string;
  likeCount: number;
  imageUrls: string[];
  content: string;
};

export type CrewGalleryDetaiCommentslResponse = {
  commentId: number;
  content: string;
  authorName: string;
  authorProfile: string;
  createdAt: string;
};

// 백엔드 확인 필요(multipart)
export type CrewGalleryRequest = {
  content: string;
  images: File[];
};

export type CrewChatResponse = {
  crewId: number;
  senderNickname: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
};

export type CrewChatRequest = {
  crewId: number;
  content: string;
  images: string[];
};
