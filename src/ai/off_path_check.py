import os
import numpy as np
import xml.etree.ElementTree as ET
from geopy.distance import geodesic
from fastdtw import fastdtw
import pandas as pd
from sklearn.neighbors import KDTree
import lxml.etree
import ast
import json

class GPXProcessor:
    def __init__(self, max_distance_tolerance=20):
        self.max_distance_tolerance = max_distance_tolerance  # 거리 비교 허용 오차 (m)

    def extract_gpx_points(self, file_path):
        """GPX 파일에서 위도와 경도 추출"""
        points = []
        try:
            # GPX 파일을 XML로 파싱
            tree = ET.parse(file_path)
            root = tree.getroot()

            # GPX 파일에서 <trk> (track), <trkseg> (track segment), <trkpt> (track point) 태그를 찾음
            for trk in root.findall('{http://www.topografix.com/GPX/1/1}trk'):
                for trkseg in trk.findall('{http://www.topografix.com/GPX/1/1}trkseg'):
                    for trkpt in trkseg.findall('{http://www.topografix.com/GPX/1/1}trkpt'):
                        lat = float(trkpt.get('lat'))
                        lon = float(trkpt.get('lon'))
                        points.append((lat, lon))
        except Exception as e:
            print(f"GPX 파일을 파싱하는 중 오류가 발생했습니다: {file_path}. 오류: {e}")
        return points

    def calculate_path_length(self, path):
        """경로의 총 거리 계산 (경로에 따라 지리적 거리 측정)"""
        total_distance = 0
        for i in range(1, len(path)):
            total_distance += geodesic(path[i - 1], path[i]).meters
        return total_distance

    def calculate_deviation_rate(self, recommended_path, actual_path):
        """추천 경로와 새 경로 간 이탈률 계산"""
        total_points = len(recommended_path)
        if total_points == 0:
            return 100.0  # 추천 경로가 비어 있으면 완전히 이탈했다고 간주

        out_of_tolerance_count = 0

        for rec_point in recommended_path:
            # 추천 경로의 각 포인트에서 실제 경로와의 최소 거리 계산
            min_distance = min(geodesic(rec_point, act_point).meters for act_point in actual_path)
            if min_distance > self.max_distance_tolerance:
                out_of_tolerance_count += 1

        deviation_rate = (out_of_tolerance_count / total_points) * 100
        return deviation_rate


class GPXProcessorWithDTW(GPXProcessor):
    def __init__(self, max_distance_tolerance=20):
        super().__init__(max_distance_tolerance)

    def vectorize_path(self, path):
        """경로를 벡터로 변환 (위도와 경도를 하나의 벡터로 결합)"""
        return np.array([point for point in path])

    def calculate_dtw_similarity(self, path1, path2):
        """DTW 기반 경로 유사도 계산"""
        distance, _ = fastdtw(path1, path2)  # fastdtw를 사용해 DTW 거리 계산
        return 1 / (1 + distance)  # DTW 거리를 기반으로 유사도를 계산 (거리 작을수록 유사도 높음)

    def check_path_completion(self, recommended_path, actual_path):
        """추천 경로를 따라 뛰었는지 여부 확인 및 수치적 결과 반환"""
        deviation_rate = self.calculate_deviation_rate(recommended_path, actual_path)  # 이탈률 계산
        recommended_length = self.calculate_path_length(recommended_path)  # 추천 경로 길이
        actual_length = self.calculate_path_length(actual_path)  # 실제 경로 길이
        dtw_similarity = self.calculate_dtw_similarity(recommended_path, actual_path)  # DTW 유사도 계산

        if deviation_rate <= 20:
            if actual_length >= recommended_length:
                if all(
                    min(geodesic(rec_point, act_point).meters for act_point in actual_path)
                    <= self.max_distance_tolerance
                    for rec_point in recommended_path
                ):
                    status = "Perfect: 추천 경로를 완벽히 따라 뛰었습니다."
                else:
                    status = "Over: 추천 경로를 따라 뛰었고, 추천 경로보다 더 뛰었습니다."
            else:
                status = "Low: 추천 경로를 일부만 뛰었고, 추천 경로보다 덜 뛰었습니다."
        else:
            status = f"Warning: 경로를 새 경로로 등록해야 합니다. 이탈률: {deviation_rate:.2f}%"

        return {
            "status": status,
            "deviation_rate": deviation_rate,  # 이탈률 (%)
            "recommended_length_km": recommended_length / 1000,  # 추천 경로 길이 (km)
            "actual_length_km": actual_length / 1000,  # 실제 경로 길이 (km)
            "dtw_similarity": dtw_similarity  # DTW 유사도 (0~1, 1에 가까울수록 유사)
        }


class PathClusterer:
    def __init__(self, processor, max_distance_tolerance=20):
        self.processor = processor
        self.max_distance_tolerance = max_distance_tolerance

    def extract_features(self, path):
        """경로에서 위도, 경도를 사용하여 특성 추출"""
        return np.array([point for point in path])  # 경로의 위도, 경도를 벡터로 반환

    def calculate_distance_matrix(self, paths):
        """경로들 간의 유사도를 기준으로 거리 행렬 생성"""
        n = len(paths)
        similarity_matrix = np.zeros((n, n))

        for i in range(n):
            for j in range(i + 1, n):
                try:
                    # 경로 간 유사도 계산
                    similarity = self.processor.calculate_dtw_similarity(paths[i][1], paths[j][1])
                    similarity_matrix[i][j] = similarity
                    similarity_matrix[j][i] = similarity
                except StopIteration:
                    # 결과가 없을 때는 경로 간 계산을 건너뛰거나 적절히 처리
                    print(f"경로 {i}와 경로 {j} 간 유사도 계산 중 오류 발생.")
                    similarity_matrix[i][j] = 0  # 유사도를 0으로 설정하여 계산을 건너뜀
                    similarity_matrix[j][i] = 0

        return similarity_matrix

    def cluster_paths(self, paths):
        """유사도를 기준으로 경로들을 비교하여 유사한 경로들을 그룹화"""
        # 경로들의 유사도 행렬 계산
        similarity_matrix = self.calculate_distance_matrix(paths)

        # 경로들을 클러스터링 하기 위한 데이터 구조
        visited = set()  # 방문한 경로를 추적
        clusters = []  # 최종 클러스터링 결과

        for i, file in enumerate(paths):
            if i in visited:
                continue  # 이미 클러스터에 포함된 경로는 건너뜀

            cluster = [file[0]]  # 첫 번째 경로를 클러스터에 포함
            visited.add(i)

            for j in range(i + 1, len(paths)):
                if j not in visited:
                    # 유사도가 90% 이상인 경우 같은 클러스터로 묶기
                    if similarity_matrix[i][j] >= 0.85 :
                        cluster.append(paths[j][0])
                        visited.add(j)

            if len(cluster) >= 3:  # 클러스터에 경로가 3개 이상이면 클러스터로 저장
                clusters.append(cluster)

        return clusters

    def extract_representative_from_clusters(self, clusters, paths):
        """각 클러스터에서 대표 경로 하나를 추출"""
        representative_paths = []
        non_representative_paths = []

        # 각 클러스터에서 첫 번째 경로를
        # 대표 경로로 선정
        for cluster in clusters:
            representative_paths.append(cluster[0])  # 대표 경로는 각 클러스터의 첫 번째 파일
            for path in cluster[1:]:
                non_representative_paths.append(path)  # 나머지 경로는 비대표 경로로 분류

        return representative_paths, non_representative_paths

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

##################### 선택된 경로 이름 짓기 #####################
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
        elevations = []  # 고도 값 저장용 리스트

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

                        # 고도 값 처리
                        ele_tag = trkpt.find('{http://www.topografix.com/GPX/1/1}ele')
                        if ele_tag is not None and ele_tag.text:
                            ele = float(ele_tag.text)
                            elevations.append(ele)
                        else:
                            elevations.append(None)  # 고도 값이 없으면 None으로 처리

                        points.append((lat, lon, None))  # 초기 고도는 None으로 설정

        # 평균 고도 계산
        valid_elevations = [e for e in elevations if e is not None]
        average_elevation = sum(valid_elevations) / len(valid_elevations) if valid_elevations else 0.0

        # 고도 값을 평균 고도로 대체
        for i, (lat, lon, _) in enumerate(points):
            ele = elevations[i] if elevations[i] is not None else average_elevation
            points[i] = (lat, lon, ele)

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


############################# 실행 #############################
if __name__ == "__main__":
    # GPX 데이터 로드 및 경로 비교
    directory_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering"
    gpx_processor = GPXProcessorWithDTW(max_distance_tolerance=20)

    #################### input ####################
    follow_status = True
    recommended_path_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a1.gpx"
    actual_path_file = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/test_clustering/test_off_a2.gpx"

    # 추천 경로 및 실제 경로 GPX 파일 로드
    recommended_path = []
    if follow_status:
        recommended_path = gpx_processor.extract_gpx_points(recommended_path_file)
    actual_path = gpx_processor.extract_gpx_points(actual_path_file)

    # 결과 저장용 변수 초기화
    gpx_files = []
    representative_paths = []
    non_representative_paths = []

    # 추천 경로와 비교
    print("\n추천 경로와 비교를 진행합니다.")
    result = gpx_processor.check_path_completion(recommended_path, actual_path)

    # 상태 메시지 출력
    print(f"추천 경로 비교 결과: {result['status']}")
    print(f"이탈률: {result['deviation_rate']:.2f}%")
    print(f"추천 경로 길이: {result['recommended_length_km']:.2f} km")
    print(f"실제 경로 길이: {result['actual_length_km']:.2f} km")
    print(f"DTW 유사도: {result['dtw_similarity']:.2f}")

    # 경로 등록 및 클러스터링
    if result["deviation_rate"] > 20:
        print("\n경로 이탈률이 높아 새 경로로 등록하고 클러스터링을 진행합니다.")
        new_file_path = os.path.join(directory_path, os.path.basename(actual_path_file))
        if os.path.exists(actual_path_file):
            try:
                os.rename(actual_path_file, new_file_path)
                print(f"경로가 새로 저장되었습니다: {new_file_path}")
                gpx_files.append((new_file_path, gpx_processor.extract_gpx_points(new_file_path)))
            except Exception as e:
                print(f"파일 이동 중 오류 발생: {e}")
        else:
            print(f"실제 경로 파일이 존재하지 않습니다: {actual_path_file}")
    else:
        print("\n추천 경로를 따랐습니다. 클러스터링은 진행하지 않습니다.")
        gpx_files.append((actual_path_file, gpx_processor.extract_gpx_points(actual_path_file)))

    # 클러스터링 진행
    if gpx_files:
        print("\n클러스터링을 진행합니다.")
        path_clusterer = PathClusterer(gpx_processor)
        clusters = path_clusterer.cluster_paths(gpx_files)

        # 클러스터 결과 확인
        if clusters:
            representative_paths, non_representative_paths = path_clusterer.extract_representative_from_clusters(clusters, gpx_files)
            for i, cluster in enumerate(clusters):
                print(f"\nCluster {i} 경로:")
                for path in cluster:
                    print(f"- {path}")
        else:
            print("클러스터링 결과가 없습니다.")
    else:
        print("클러스터링 대상 파일이 없습니다.")

    ############################# 경로 이름 짓기 #############################
    toilet_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_toilet.csv"
    conv_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_conv.csv"
    trafficlight_data_path = "C:/Users/정호원/OneDrive/바탕 화면/gpx 수집/code/final_trafficlight.csv"

    processor = GPXProcessor(toilet_data_path, conv_data_path, trafficlight_data_path)

    # 클러스터별 대표 경로 처리
    if representative_paths:
        for cluster_idx, representative_path in enumerate(representative_paths):
            sample_file = os.path.join(directory_path, representative_path)
            processed_data = processor.process_gpx_file(sample_file)

            # 한 줄씩 출력
            print(f"\n=== 클러스터 {cluster_idx} 대표 경로 ===")
            print(f"sample_file: {sample_file}")
            print(f"name: {processed_data['name']}")
            print(f"toilet_counts: {processed_data['toilet_counts']}")
            print(f"toilet_location: {transform_coordinates_to_json({'toilet_location': processed_data['toilet_location']}, 'toilet_location')}")
            print(f"store_counts: {processed_data['store_counts']}")
            print(f"store_location: {transform_coordinates_to_json({'store_location': processed_data['store_location']}, 'store_location')}")
            print(f"distance_km: {processed_data['distance_km']}")
            print(f"Track: {processed_data['Track']}")
            print(f"Elevation: {processed_data['Elevation']}")
            print(f"Convenience: {processed_data['Convenience']}")
            print(f"trafficlight_counts: {processed_data['trafficlight_counts']}")