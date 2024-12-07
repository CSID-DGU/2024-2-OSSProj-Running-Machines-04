import os
import pandas as pd
import numpy as np
from geopy.distance import geodesic
from sklearn.neighbors import KDTree
import lxml.etree
import ast
import json

class GPXProcessor:
    def __init__(self, toilet_data_path, conv_data_path, trafficlight_data_path):
        # 데이터 로드
        self.toilet_data = pd.read_csv(toilet_data_path)
        self.conv_data = pd.read_csv(conv_data_path)
        self.trafficlight_data = pd.read_csv(trafficlight_data_path)

        # K-D 트리 생성 (시설 위치 기준으로)
        self.toilet_tree = KDTree(self.toilet_data[['latitude', 'longitude']].values)
        self.conv_tree = KDTree(self.conv_data[['latitude', 'longitude']].values)
        self.trafficlight_tree = KDTree(self.trafficlight_data[['latitude', 'longitude']].values)

    def extract_gpx_points(self, file_path):
        points = []
        with open(file_path, 'rb') as gpx_file:
            # lxml을 이용하여 GPX 파일 파싱
            tree = lxml.etree.parse(gpx_file)
            root = tree.getroot()
            
            # GPX 파일에서 트랙 정보를 추출 (gpx 태그는 네임스페이스가 있을 수 있음)
            for trk in root.findall('.//{http://www.topografix.com/GPX/1/1}trk'):
                for trkseg in trk.findall('{http://www.topografix.com/GPX/1/1}trkseg'):
                    for trkpt in trkseg.findall('{http://www.topografix.com/GPX/1/1}trkpt'):
                        lat = float(trkpt.get('lat'))
                        lon = float(trkpt.get('lon'))
                        ele = trkpt.find('{http://www.topografix.com/GPX/1/1}ele').text
                        ele = float(ele) if ele else 0
                        points.append((lat, lon, ele))

        return np.array(points)

    def calculate_distances(self, points):
        coords = points[:, :2]
        return np.array([geodesic(coords[i], coords[i + 1]).meters for i in range(len(coords) - 1)])

    def sample_points_by_distance(self, points, distances, interval=500):
        sampled_points = [points[0]]
        accumulated_distance = 0
        for i, dist in enumerate(distances):
            accumulated_distance += dist
            if accumulated_distance >= interval:
                sampled_points.append(points[i + 1])
                accumulated_distance = 0
        sampled_points.append(points[-1])
        return np.array(sampled_points)

    def classify_facilities(self, toilets, conv_stores, trafficlights):
        total_facilities = toilets + conv_stores + trafficlights
        if total_facilities == 0:
            return "No_Facilities"
        elif total_facilities >= 23:
            return "Enhanced_Facilities"
        else:
            return "Essential_Facilities"

    def classify_track(self, points, distances):
        min_track_length = 300
        center_proximity_threshold = 0.6
        nearby_distance_threshold = 90
        endpoint_proximity_threshold = 50

        coords = points[:, :2]
        center = coords.mean(axis=0)
        center_distances = np.linalg.norm(coords - center, axis=1)
        center_proximity = np.mean(center_distances < nearby_distance_threshold)

        if center_proximity < center_proximity_threshold:
            return "NonTrack"

        start_point, end_point = coords[0], coords[-1]
        if geodesic(start_point, end_point).meters > endpoint_proximity_threshold:
            return "NonTrack"

        total_length = distances.sum()
        return "Track" if total_length >= min_track_length else "NonTrack"

    def classify_difficulty(self, avg_elevation_change):
        thresholds = {
            "beginner_threshold": 0.020962435991564006,
            "advanced_threshold": 0.05274945669390355,
        }
        if avg_elevation_change <= thresholds["beginner_threshold"]:
            return "Beginner"
        elif avg_elevation_change <= thresholds["advanced_threshold"]:
            return "Advanced"
        else:
            return "Expert"

    def count_facilities_for_gpx(self, sampled_points, radius=500):
        def count_and_collect_nearby(facility_data, tree):
            total_count = 0
            locations = []
            for _, facility in facility_data.iterrows():
                for point in sampled_points:
                    if geodesic(point[:2], (facility['latitude'], facility['longitude'])).meters <= radius:
                        total_count += 1
                        locations.append((facility['latitude'], facility['longitude']))
                        break
            return total_count, locations

        toilet_count, toilet_locations = count_and_collect_nearby(self.toilet_data, self.toilet_tree)
        conv_count, conv_locations = count_and_collect_nearby(self.conv_data, self.conv_tree)
        trafficlight_count = self.count_unique_trafficlights(sampled_points, self.trafficlight_data, radius=0.001)

        return toilet_count, toilet_locations, conv_count, conv_locations, trafficlight_count

    def count_unique_trafficlights(self, points, trafficlight_data, radius=0.001):
        tree = KDTree(points[:, :2])
        trafficlight_coords = trafficlight_data[['latitude', 'longitude']].values

        nearby_indices = tree.query_radius(trafficlight_coords, r=radius)
        unique_trafficlights = set()
        
        for i, indices in enumerate(nearby_indices):
            if indices.size > 0:
                unique_trafficlights.add(tuple(trafficlight_coords[i]))

        return len(unique_trafficlights)

    def process_gpx_file(self, file_path):
        points = self.extract_gpx_points(file_path)
        distances = self.calculate_distances(points)

        total_length_km = distances.sum() / 1000
        sampled_points = self.sample_points_by_distance(points, distances)

        toilet_count, toilet_locations, conv_count, conv_locations, trafficlight_count = self.count_facilities_for_gpx(sampled_points)

        facility_label = self.classify_facilities(toilet_count, conv_count, trafficlight_count)
        track_label = self.classify_track(points, distances)

        elevation_differences = np.diff(points[:, 2]) if points.shape[1] > 2 else np.array([0])
        valid_distances = distances[distances > 0]
        elevation_ratios = elevation_differences[:len(valid_distances)] / valid_distances
        avg_elevation_change = np.mean(np.abs(elevation_ratios[np.isfinite(elevation_ratios)]))
        difficulty_label = self.classify_difficulty(avg_elevation_change)

        track_value = "TRUE" if track_label == "Track" else "FALSE"
        elevation_value = (
            "LOW" if difficulty_label == "Beginner" else
            "MEDIUM" if difficulty_label == "Advanced" else
            "HIGH"
        )
        convenience_value = (
            "LOW" if facility_label == "No_Facilities" else
            "MEDIUM" if facility_label == "Essential_Facilities" else
            "HIGH"
        )

        return {
            "name": f"{int(total_length_km)}_{difficulty_label}_{facility_label}_{track_label}_{round(total_length_km, 1)}Km.gpx",
            "toilet_counts": toilet_count,
            "toilet_location": toilet_locations,
            "store_counts": conv_count,
            "store_location": conv_locations,
            "distance_km": round(total_length_km, 1),
            "Track": track_value,
            "Elevation": elevation_value,
            "Convenience": convenience_value,
            "trafficlight_counts": trafficlight_count,
        }
        
def transform_coordinates_to_json(row, column_name):
    try:
        # 좌표가 이미 리스트 형태로 되어있으면 바로 사용
        coords_list = row[column_name]  # 예: [(37.5139956, 126.8828703), (37.5172147, 126.8837416), ...]
        
        # 좌표 리스트를 lat, lon 형식으로 변환하여 JSON으로 변환
        json_coords = [{"lat": coord[0], "lon": coord[1]} for coord in coords_list]
        
        return json.dumps(json_coords)  # JSON 형식으로 변환하여 반환
    except Exception as e:
        print(f"좌표 변환 오류 발생: {row[column_name]}")
        return None

if __name__ == "__main__":
    toilet_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_toilet.csv"
    conv_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_conv.csv"
    trafficlight_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_trafficlight.csv"
    sample_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/gpx/20_Beginner_Enhanced_Facilities_Track_0.3Km.gpx"

    processor = GPXProcessor(toilet_data_path, conv_data_path, trafficlight_data_path)
    processed_data = processor.process_gpx_file(sample_file)

    # 한 줄씩 출력
    print(f"name: {processed_data['name']}")
    print(f"toilet_counts: {processed_data['toilet_counts']}")
    print(f"toilet_location: {transform_coordinates_to_json(processed_data, 'toilet_location')}")
    print(f"store_counts: {processed_data['store_counts']}")
    print(f"store_location: {transform_coordinates_to_json(processed_data, 'store_location')}")
    print(f"distance_km: {processed_data['distance_km']}")
    print(f"Track: {processed_data['Track']}")
    print(f"Elevation: {processed_data['Elevation']}")
    print(f"Convenience: {processed_data['Convenience']}")
    print(f"trafficlight_counts: {processed_data['trafficlight_counts']}")

