import {
  CreateCrew,
  getCrew,
  getCrewGallery,
  getCrewGalleryDetail,
  getCrewGalleryDetailComments,
  getCrewMember,
  getCrewNotice,
  getCrewNoticeDetail,
  JoinCrew,
  postCrewGallery,
  postCrewGalleryComments,
  postCrewGalleryLike,
  postCrewNotice,
} from "@/apis/crew";
import { CrewGalleryRequest, CrewNoticeRequest } from "@/types/crew";
import { useMutation, useQuery } from "@tanstack/react-query";

// 크루 공지 조회
export const useCrewNoticeGet = (crewId: number) => {
  return useQuery({
    queryKey: ["notice", crewId],
    queryFn: () => getCrewNotice(crewId),
  });
};

// 크루 공지 상세 조회
export const useCrewNoticeDetailGet = (crewId: number, crewPostId: number) => {
  return useQuery({
    queryKey: ["notice", crewId],
    queryFn: () => getCrewNoticeDetail(crewId, crewPostId),
  });
};

// 크루 공지 등록
export const useCrewNoticePost = ({
  crewId,
  data,
}: {
  crewId: number;
  data: CrewNoticeRequest;
}) => {
  return useMutation({
    mutationFn: () => postCrewNotice({ crewId, data }),
    onSuccess: () => {
      console.log("크루 공지 등록 성공");
    },
    onError: () => {
      console.log("크루 공지 등록 실패");
    },
  });
};

// 크루 가입
export const useJoinCrew = (crewId: number) => {
  return useMutation({
    mutationFn: () => JoinCrew(crewId),
    onSuccess: () => {
      console.log("크루 가입 성공");
    },
    onError: () => {
      console.log("크루 가입 실패");
    },
  });
};

// 크루 생성
export const useCreateCrew = ({
  certificationImage,
  profileImage,
}: {
  certificationImage: File;
  profileImage: File;
}) => {
  return useMutation({
    mutationFn: () => CreateCrew({ certificationImage, profileImage }),
    onSuccess: () => {
      console.log("크루 생성 성공");
    },
    onError: () => {
      console.log("크루 생성 실패");
    },
  });
};

// 다른 크루 조회
export const useCrewGet = () => {
  return useQuery({
    queryKey: ["crew"],
    queryFn: () => getCrew(),
  });
};

// 크루 멤버, 크루명, 포스팅 수 조회
export const useCrewMemberGet = (crewId: number) => {
  return useQuery({
    queryKey: ["crewMember"],
    queryFn: () => getCrewMember(crewId),
  });
};

// 크루 갤러리 조회
export const useCrewGalleryGet = (crewId: number) => {
  return useQuery({
    queryKey: ["crewGallery", crewId],
    queryFn: () => getCrewGallery(crewId),
  });
};

// 크루 갤러리 상세 조회
export const useCrewGalleryDetailGet = (crewId: number, postId: number) => {
  return useQuery({
    queryKey: ["crewGalleryDetail", postId],
    queryFn: () => getCrewGalleryDetail(crewId, postId),
  });
};

// 크루 갤러리 댓글 조회
export const useCrewGalleryDetailCommentsGet = (
  crewId: number,
  postId: number
) => {
  return useQuery({
    queryKey: ["crewGalleryComments", postId],
    queryFn: () => getCrewGalleryDetailComments(crewId, postId),
  });
};

// 크루 갤러리 글 작성
export const useCrewGalleryPost = ({
  crewId,
  data,
}: {
  crewId: number;
  data: CrewGalleryRequest;
}) => {
  return useMutation({
    mutationFn: () => postCrewGallery({ crewId, data }),
    onSuccess: () => {
      console.log("크루 갤러리 글 작성 성공");
    },
    onError: () => {
      console.log("크루 갤러리 글 작성 실패");
    },
  });
};

// 크루 갤러리 댓글 작성
export const useCrewGalleryCommentsPost = (
  crewId: number,
  postId: number,
  content: string
) => {
  return useMutation({
    mutationFn: () => postCrewGalleryComments(crewId, postId, content),
    onSuccess: () => {
      console.log("크루 갤러리 댓글 작성 성공");
      window.location.reload();
    },
    onError: () => {
      console.log("크루 갤러리 댓글 작성 실패");
    },
  });
};

// 크루 갤러리 좋아요
export const useCrewGalleryLikePost = (crewId: number, postId: number) => {
  return useMutation({
    mutationFn: () => postCrewGalleryLike(crewId, postId),
    onSuccess: () => {
      console.log("크루 갤러리 댓글 작성 성공");
    },
    onError: () => {
      console.log("크루 갤러리 댓글 작성 실패");
    },
  });
};
