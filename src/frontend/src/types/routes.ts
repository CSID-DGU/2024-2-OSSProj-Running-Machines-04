import { LatLng } from "./kakaoMap";

export type RouteResponse = {
  courseId: number;
  courseUrl: string;
  distance: number;
  fileName: string;
  name: string;
  description: string;
  tags: string[];
  toiletCounts: number;
  storeCounts: number;
  trafficLightCounts: number;
  courseLiked: boolean;
};

export type RouteStore = {
  courseId: number;
  path: LatLng[];
};
