export interface LatLng {
  lat: number;
  lng: number;
}

export interface Route {
  id: number;
  path: LatLng[];
  name: string;
  tag: string[];
  distance: number;
}
