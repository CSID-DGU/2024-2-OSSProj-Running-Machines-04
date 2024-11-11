package RunningMachines.R2R.domain.course.service;

import RunningMachines.R2R.domain.course.dto.CourseResponseDto;
import RunningMachines.R2R.domain.course.dto.GpxResponseDto;
import RunningMachines.R2R.domain.course.dto.WaypointDto;
import RunningMachines.R2R.global.util.GpxParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseQueryService {

    private final GpxParser gpxParser;

    // 위경도를 기반으로 가져온 코스 정보 추출
    public List<CourseResponseDto> getCourses(double lat, double lon) {
        // 코스 리스트
        List<GpxResponseDto> gpxs = gpxParser.parseGpxs(lat, lon);
        // 반환값을 담을 리스트
        List<CourseResponseDto> courseResponses = new ArrayList<>();

        for (GpxResponseDto gpx : gpxs) {
            String fileName = gpx.getFileName();
            List<WaypointDto> waypoints = gpx.getWaypoints();

            // TODO - 모델 서버와 연동하여 실제 거리 받아오기
            double distance = 0; // 임시로 0으로 설정

            // 파일명으로부터 태그 생성
            List<String> tags = createTags(fileName);

            // 각 파일에 대한 CourseResponseDto 생성 및 리스트에 추가
            courseResponses.add(new CourseResponseDto(fileName, waypoints, distance, tags));
        }
        return courseResponses;
    }

    // 파일명 파싱해 코스 태그 생성
    // TODO - 해당 코스에 대한 리뷰가 있을 경우 상위 3개의 태그 가져와서 코스 태그 생성
    private List<String> createTags(String fileName) {
        String name = fileName.substring(0, fileName.lastIndexOf('.')); // 확장자 제거
        String[] tags = name.split("_"); // 파일명을 '_'로 구분하여 태그 리스트 생성
        tags = Arrays.copyOf(tags, tags.length - 1); // 파일명 제일 앞에 있는 인덱스 제거
        return List.of(tags);
    }
}
