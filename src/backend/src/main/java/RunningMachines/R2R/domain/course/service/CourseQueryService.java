package RunningMachines.R2R.domain.course.service;

import RunningMachines.R2R.domain.course.dto.CourseResponseDto;
import RunningMachines.R2R.domain.course.entity.Course;
import RunningMachines.R2R.domain.course.entity.Review;
import RunningMachines.R2R.domain.course.entity.ReviewTag;
import RunningMachines.R2R.domain.course.repository.CourseLikeRepository;
import RunningMachines.R2R.domain.course.repository.CourseRepository;
import RunningMachines.R2R.domain.course.repository.ReviewRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseQueryService {

    private final CourseRepository courseRepository;
    private final CourseLikeRepository courseLikeRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final WebClient webClient;

    // 위경도 기반 추천 코스 조회
    public List<CourseResponseDto> getRecommendedCourses(String email, double lat, double lon) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Map<String, Object> requestBody = Map.of(
                "latitude", lat,
                "longitude", lon,
                "elevation_preference", String.valueOf(user.getPrefer().getElevation()),
                "convenience_preference", String.valueOf(user.getPrefer().getConvenience()),
                "track_preference", String.valueOf(user.getPrefer().getTrack())
        );

        String endpoint = "/recommendCourse";

        List<Map<String, String>> fileNameList = new ArrayList<>();
        try {
            // API 호출
            fileNameList = webClient.post()
                    .uri(endpoint)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE) // Content-Type 명시
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(List.class) // 응답 처리
                    .block(); // 동기적으로 처리

        } catch (WebClientResponseException e) {
            // 서버 응답에 대한 에러 처리
//            System.err.println("Error during API call: " + e.getResponseBodyAsString());
            throw new RuntimeException("Failed to call API: " + e.getStatusCode(), e);
        } catch (Exception e) {
            // 기타 에러 처리
//            System.err.println("Unexpected error: " + e.getMessage());
            throw new RuntimeException("Unexpected error during API call", e);
        }

        List<CourseResponseDto> courses = new ArrayList<>(); // 결과 담는 리스트
        if (fileNameList != null) {
            for (Map<String, String> file : fileNameList) {
                String fileName = file.get("file_name");

                Course course = courseRepository.findByFileName(fileName);

                boolean coursedLike = courseLikeRepository.existsByCourseAndUser(course, user);

                CourseResponseDto courseResponseDto = CourseResponseDto.of(course, createTags(course, fileName), coursedLike);

                courses.add(courseResponseDto);
            }
        }
        return courses;
    }

    public List<String> createTags(Course course, String fileName) {
        List<Review> reviews = reviewRepository.findByCourseId(course.getId());

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

        return courseLikeRepository.findByUser(user).stream()
                .map(courseLike -> CourseResponseDto.of(courseLike.getCourse(), createTags(courseLike.getCourse(), courseLike.getCourse().getFileName()), true))
                .toList();
    }

    public List<String> allCourseUrl() {
        return courseRepository.findAll().stream()
                .map(Course::getCourseUrl)
                .collect(Collectors.toList());
    }
}
