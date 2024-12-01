import os
import gpxpy
import pandas as pd
import numpy as np
from geopy.distance import geodesic

class GPXProcessor:
    def __init__(self, toilet_data_path, conv_data_path):
        self.toilet_data = pd.read_csv(toilet_data_path)
        self.conv_data = pd.read_csv(conv_data_path)

    def extract_gpx_points(self, file_path):
        points = []
        with open(file_path, 'r', encoding='utf-8') as gpx_file:
            gpx = gpxpy.parse(gpx_file)
            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        # 고도 값이 None이면 0으로 대체
                        elevation = point.elevation if point.elevation is not None else 0
                        points.append((point.latitude, point.longitude, elevation))
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

    def count_nearby_facilities(self, sampled_points, facility_data, radius=500):
        sampled_coords = sampled_points[:, :2]
        facility_coords = facility_data[['latitude', 'longitude']].to_numpy()

        # 전체 샘플 포인트와 시설 사이의 거리를 한 번에 계산하여 효율성 향상
        distances_to_facilities = np.array([
            [geodesic(sample, facility).meters for sample in sampled_coords] for facility in facility_coords
        ])
        
        # 각 시설에 대해 반경 내에 있는 샘플 포인트가 있는지 확인
        count = np.sum(np.any(distances_to_facilities <= radius, axis=1))
        return count

    def classify_facilities(self, toilets, conv_stores):
        total_facilities = toilets + conv_stores
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

    def process_gpx_file(self, file_path):
        points = self.extract_gpx_points(file_path)
        distances = self.calculate_distances(points)

        total_length_km = distances.sum() / 1000
        sampled_points = self.sample_points_by_distance(points, distances)

        toilets = self.count_nearby_facilities(sampled_points, self.toilet_data)
        conv_stores = self.count_nearby_facilities(sampled_points, self.conv_data)

        # 고도 변화 계산 (None 처리 포함)
        elevation_differences = np.diff(points[:, 2])
        valid_distances = distances[distances > 0]
        elevation_ratios = elevation_differences[:len(valid_distances)] / valid_distances
        avg_elevation_change = np.mean(np.abs(elevation_ratios[np.isfinite(elevation_ratios)]))

        facility_label = self.classify_facilities(toilets, conv_stores)
        track_label = self.classify_track(points, distances)
        difficulty_label = self.classify_difficulty(avg_elevation_change)

        return {
            "file_name": os.path.basename(file_path),
            "difficulty": difficulty_label,
            "facilities": facility_label,
            "track_type": track_label,
            "distance_km": round(total_length_km, 1)
        }

if __name__ == "__main__":
    toilet_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_toilet.csv"
    conv_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_conv.csv"
    sample_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_c2.gpx"

    gpx_processor = GPXProcessor(toilet_data_path, conv_data_path)
    result = gpx_processor.process_gpx_file(sample_file)

    new_file_name = f"{result['difficulty']}_{result['facilities']}_{result['track_type']}_{result['distance_km']}Km.gpx"
    print(f"새로운 파일명: {new_file_name}")
