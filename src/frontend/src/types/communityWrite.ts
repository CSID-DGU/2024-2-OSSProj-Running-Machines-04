export type communityRequestType = {
  title: string;
  description: string;
  image: File | null;
};

export const initialCommunityRequest = {
  title: "",
  description: "",
  image: null,
};
