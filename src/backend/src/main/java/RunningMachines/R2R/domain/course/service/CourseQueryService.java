package RunningMachines.R2R.domain.course.service;

import RunningMachines.R2R.domain.course.dto.CourseDetailResponseDto;
import RunningMachines.R2R.domain.course.dto.CourseResponseDto;
import RunningMachines.R2R.domain.course.dto.GpxResponseDto;
import RunningMachines.R2R.domain.course.dto.WaypointDto;
import RunningMachines.R2R.domain.course.entity.Course;
import RunningMachines.R2R.domain.course.entity.CourseLike;
import RunningMachines.R2R.domain.course.entity.Review;
import RunningMachines.R2R.domain.course.entity.ReviewTag;
import RunningMachines.R2R.domain.course.repository.CourseLikeRepository;
import RunningMachines.R2R.domain.course.repository.CourseRepository;
import RunningMachines.R2R.domain.course.repository.ReviewRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.util.GpxParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseQueryService {

    private final GpxParser gpxParser;
    private final CourseRepository courseRepository;
    private final CourseLikeRepository courseLikeRepository;
    private final ReviewRepository reviewRepository;
    private final S3Provider s3Provider;
    private final UserRepository userRepository;

    public List<CourseResponseDto> getCourses(String email, double lat, double lon) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // S3에서 GPX 파일 목록 가져오기
        List<String> fileKeys = s3Provider.getCourseFiles();
//        log.info("총 {}개의 GPX 파일을 가져왔습니다.", fileKeys.size());

        // 파일 처리
        return fileKeys.stream()
                .map(fileKey -> processFile(fileKey, user)) // 파일을 처리하여 CourseResponseDto로 변환
                .toList(); // 리스트로 변환
    }

    private CourseResponseDto processFile(String fileKey, User user) {
        // S3에서 파일 URL 및 원본 파일명 가져오기
        URL url = s3Provider.getFileUrl(fileKey);
        String courseUrl = url.toString();
        String fileName = s3Provider.getOriginalFileName(fileKey);

        Course course = courseRepository.findByFileName(fileName);

        // TODO - 모델 연동 -> 거리, 코스명 데이터 받아 오기

        // 즐겨찾기 여부
        boolean coursedLike = courseLikeRepository.existsByCourseAndUser(course, user);

        return CourseResponseDto.of(course, courseUrl, fileName, createTags(course.getId(), fileName), coursedLike);
    }

    // 위경도를 기반으로 가져온 코스 정보 추출
    public List<CourseDetailResponseDto> getCourseDetails(double lat, double lon) {
        // 코스 리스트
        List<GpxResponseDto> gpxs = gpxParser.parseGpxs(lat, lon);
        // 반환값을 담을 리스트
        List<CourseDetailResponseDto> courseResponses = new ArrayList<>();

        for (GpxResponseDto gpx : gpxs) {
            log.info("{}",gpx);
            String fileName = gpx.getFileName();
            List<WaypointDto> waypoints = gpx.getWaypoints();

//            double distance = courseRepository.findDistanceByFileName(fileName); // 임시 저장된 거리 데이터
//            log.info("Course URL: {}, Distance: {}", gpx.getCourseUrl(), distance);
//            log.info("Course URL: {}]", gpx.getCourseUrl());

            Course course = courseRepository.findByFileName(fileName);
            double distance = course.getDistance(); // 엔티티의 distance 가져오기
            String name = course.getName();   // 엔티티의 name 가져오기

            // 파일명으로부터 태그 생성
            List<String> tags = createTags(course.getId(), fileName);

            // 각 파일에 대한 CourseDetailResponseDto 생성 및 리스트에 추가
            courseResponses.add(new CourseDetailResponseDto(fileName, waypoints, distance, tags, name));
        }
        return courseResponses;
    }

    private List<String> createTags(Long courseId, String fileName) {
        List<Review> reviews = reviewRepository.findByCourseId(courseId);

        if (!reviews.isEmpty()) {
            List<String> tags = new ArrayList<>();

            for (Review review : reviews) {
                for (ReviewTag reviewTag : review.getReviewTags()) {
                    tags.add(reviewTag.getTag().getName());
                }
            }

            // 가장 많이 선택된 3개의 태그 선택
            return tags.stream()
                    .collect(Collectors.groupingBy(tag -> tag, Collectors.counting())) // 태그 개수 count
                    .entrySet().stream()
                    .sorted(Map.Entry.<String, Long>comparingByValue().reversed()) // 내림차순 정렬
                    .limit(3) // 상위 3개
                    .map(Map.Entry::getKey) // key만 추출(태그명)
                    .toList();
        }

        // 리뷰 태그가 없으면 파일명 파싱해 코스 태그 생성
        String name = fileName.substring(0, fileName.lastIndexOf('.')); // 확장자 제거
        String[] tags = name.split("_"); // 파일명을 '_'로 구분하여 태그 리스트 생성
        tags = Arrays.copyOfRange(tags, 1, tags.length - 1); // 첫,마지막 번째 태그를 제외한 배열 생성 (파일명 인덱스 및 거리값 제거)
        return List.of(tags);
    }

    // 즐겨찾기 코스 조회
    public List<CourseResponseDto> getLikeCourses(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        List<CourseLike> likedCourses = courseLikeRepository.findByUser(user);

        return likedCourses.stream()
                .map(courseLike -> processLikedCourse(courseLike.getCourse(), user))
                .toList();
    }

    private CourseResponseDto processLikedCourse(Course course, User user) {
        String courseUrl = course.getCourseUrl();
        String fileName = course.getFileName();

        return CourseResponseDto.of(course, courseUrl, fileName, createTags(course.getId(), fileName), true);
    }

    public List<String> allCourseUrl() {
        return courseRepository.findAll().stream()
                .map(Course::getCourseUrl)
                .collect(Collectors.toList());
    }
}
