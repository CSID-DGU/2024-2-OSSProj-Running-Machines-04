export type waypoint = {
  lat: number;
  lon: number;
};

export type courseResponseType = {
  fileName: string;
  waypoints: waypoint[];
  distance: number;
  tags: string[];
  name: string;
};

export type courseResponseParams = {
  lat: number;
  lon: number;
};
