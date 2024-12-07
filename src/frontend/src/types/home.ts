export type homeUserResponse = {
  totalDistance: number;
  averagePace: number;
  totalDuration: number;
};

export type homeRankingResponse = {
  image: string;
  crewId: number;
  title: string;
  distance: string;
};

export type homePaceRankingResponse = {
  image: string;
  crewId: number;
  title: string;
  averagePace: string;
};

export type homeCrewResponse = {
  distanceRankings: homeRankingResponse[];
  paceRankings: homePaceRankingResponse[];
};
