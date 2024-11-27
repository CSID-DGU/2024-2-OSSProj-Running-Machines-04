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
                        points.append((point.latitude, point.longitude, point.elevation))
        return points

    def calculate_track_length(self, points):
        return sum(
            geodesic((points[i][0], points[i][1]), (points[i+1][0], points[i+1][1])).meters
            for i in range(len(points) - 1)
        )

    def sample_points_by_distance(self, points, interval=500):
        sampled_points = [points[0]]
        accumulated_distance = 0
        last_point = points[0]

        for point in points[1:]:
            accumulated_distance += geodesic(
                (last_point[0], last_point[1]), (point[0], point[1])
            ).meters
            if accumulated_distance >= interval:
                sampled_points.append(point)
                accumulated_distance = 0
            last_point = point

        return sampled_points

    def count_facilities_for_gpx(self, sampled_points, radius=500):
        def count_nearby(facility_data):
            return sum(
                any(
                    geodesic((point[0], point[1]), (facility['latitude'], facility['longitude'])).meters <= radius
                    for point in sampled_points
                )
                for _, facility in facility_data.iterrows()
            )

        toilets = count_nearby(self.toilet_data)
        convenience_stores = count_nearby(self.conv_data)
        return toilets, convenience_stores

    def classify_facilities(self, toilets, conv_stores):
        total_facilities = toilets + conv_stores
        if total_facilities == 0:
            return "No_Facilities"
        elif total_facilities >= 23:
            return "Enhanced_Facilities"
        else:
            return "Essential_Facilities"

    def classify_track(self, points):
        center_proximity_threshold = 0.6  # 중심 근처 포인트 비율
        nearby_distance_threshold = 90  # 중심 근처 거리 기준 (미터)
        endpoint_proximity_threshold = 50  # 시작/끝점 거리 기준 (미터)
        min_track_length = 300  # 최소 트랙 길이 (미터)

        lats = [p[0] for p in points]
        lons = [p[1] for p in points]
        center = (np.mean(lats), np.mean(lons))

        center_proximity = sum(
            geodesic((p[0], p[1]), center).meters < nearby_distance_threshold
            for p in points
        ) / len(points)

        if center_proximity < center_proximity_threshold:
            return "NonTrack"

        start_point = (points[0][0], points[0][1])
        end_point = (points[-1][0], points[-1][1])
        if geodesic(start_point, end_point).meters > endpoint_proximity_threshold:
            return "NonTrack"

        total_length = self.calculate_track_length(points)
        return "Track" if total_length >= min_track_length else "NonTrack"

    def classify_difficulty(self, avg_elevation_change):
        cluster_thresholds = {
            "beginner_threshold": 0.020962435991564006,
            "advanced_threshold": 0.05274945669390355,
        }
        if avg_elevation_change <= cluster_thresholds["beginner_threshold"]:
            return "Beginner"
        elif avg_elevation_change <= cluster_thresholds["advanced_threshold"]:
            return "Advanced"
        else:
            return "Expert"

    def process_gpx_file(self, file_path):
        points = self.extract_gpx_points(file_path)
        total_length = self.calculate_track_length(points) / 1000  # 거리(km)

        sampled_points = self.sample_points_by_distance(points)
        toilets, conv_stores = self.count_facilities_for_gpx(sampled_points)

        avg_elevation_change = np.mean([
            abs(points[i][2] - points[i-1][2]) /
            geodesic((points[i-1][0], points[i-1][1]), (points[i][0], points[i][1])).meters
            for i in range(1, len(points)) if points[i][2] is not None and points[i-1][2] is not None
        ])

        facility_label = self.classify_facilities(toilets, conv_stores)
        track_label = self.classify_track(points)
        difficulty_label = self.classify_difficulty(avg_elevation_change)

        return {
            "file_name": os.path.basename(file_path),
            "difficulty": difficulty_label,
            "facilities": facility_label,
            "track_type": track_label,
            "distance_km": round(total_length, 1)
        }

if __name__ == "__main__":
    toilet_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_toilet.csv"
    conv_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/final_conv.csv"
    sample_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test/sample2.gpx"

    gpx_processor = GPXProcessor(toilet_data_path, conv_data_path)
    result = gpx_processor.process_gpx_file(sample_file)

    new_file_name = f"{result['difficulty']}_{result['facilities']}_{result['track_type']}_{result['distance_km']}Km.gpx"
    print(f"새로운 파일명: {new_file_name}")