import { LatLng } from "./kakaoMap";

export type RouteResponse = {
  courseId: number;
  courseUrl: string;
  distance: number;
  fileName: string;
  name: string;
  tags: string[];
};

export type RouteStore = {
  courseId: number;
  path: LatLng[];
};
