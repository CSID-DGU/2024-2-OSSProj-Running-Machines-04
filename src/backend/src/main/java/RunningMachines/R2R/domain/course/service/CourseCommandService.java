package RunningMachines.R2R.domain.course.service;

import RunningMachines.R2R.domain.course.entity.Course;
import RunningMachines.R2R.domain.course.entity.CourseLike;
import RunningMachines.R2R.domain.course.repository.CourseLikeRepository;
import RunningMachines.R2R.domain.course.repository.CourseRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.s3.S3RequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseCommandService {

    private final S3Provider s3Provider;
    private final CourseRepository courseRepository;
    private final CourseLikeRepository courseLikeRepository;
    private final UserRepository userRepository;

    // S3에 러닝 코스를 넣는 메소드 (관리자용)
    public void uploadCourseGpx(List<MultipartFile> gpxs) {

        for (MultipartFile file : gpxs) {
            String gpxUrl = s3Provider.uploadFile(file, S3RequestDto.builder()
                    .userId(null) // 관리자 전용이기 때문에 userId 없음
                    .dirName("course")
                    .build());

            String fileName = file.getOriginalFilename(); // 원본 파일명을 fileName에 저장

            // Course 엔티티 생성
            Course course = Course.createCourse(gpxUrl, fileName);

            courseRepository.save(course);
        }
    }

    public String saveCourseLike(String email, Long courseId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CustomException(ErrorCode.COURSE_NOT_FOUND));

        Optional<CourseLike> existingCourseLike = courseLikeRepository.findByUserAndCourse(user, course);

        if (existingCourseLike.isPresent()) {
            // 기존 데이터가 있다면 즐겨찾기 취소
            courseLikeRepository.delete(existingCourseLike.get());
            return "좋아요 취소 성공";
        } else {
            // 기존 데이터가 없다면 즐겨찾기 등록
            CourseLike courseLike = CourseLike.builder()
                    .user(user)
                    .course(course)
                    .build();
            courseLikeRepository.save(courseLike);
            return "좋아요 등록 성공";
        }
    }
}
