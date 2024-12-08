import { waypoint } from "./course";

export type RouteResponse = {
  courseId: number;
  fileName: string;
  courseUrl: string;
  name: string;
  description: string;
  distance: number;
  tags: string[];
  toiletCounts: number;
  toiletLocation: waypoint[];
  storeCounts: number;
  storeLocation: waypoint[];
  trafficLightCounts: number;
  courseLiked: boolean;
};
