import { gpx } from "@tmcw/togeojson";
// import { DOMParser } from "@xmldom/xmldom";
// import testGpx from "raw-loader!@/assets/test.gpx";

const parseGpxToCoordinates = (gpxString: string): [number, number][] => {
  // Parse GPX XML string
  const parser = new DOMParser();
  const xml = parser.parseFromString(gpxString, "application/xml");

  // Convert GPX to GeoJSON
  const geojson = gpx(xml);

  // Extract coordinates from GeoJSON features
  const coordinates: [number, number][] = [];
  geojson.features.forEach((feature) => {
    if (feature.geometry && feature.geometry.type === "LineString") {
      feature.geometry.coordinates.forEach(([lon, lat]) => {
        coordinates.push([lat, lon]); // GeoJSON uses [lon, lat]
      });
    }
  });

  return coordinates;
};

// Example usage
const GpxMap = () => {
  // const gpxString = testGpx;
  // const positions = parseGpxToCoordinates(gpxString);
  // console.log(positions);
};

export default GpxMap;
