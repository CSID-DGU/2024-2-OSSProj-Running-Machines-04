package RunningMachines.R2R.domain.course.service;

import RunningMachines.R2R.domain.course.dto.UserCourseRequestDto;
import RunningMachines.R2R.domain.course.dto.UserCourseResponseDto;
import RunningMachines.R2R.domain.course.entity.Course;
import RunningMachines.R2R.domain.course.entity.UserCourse;
import RunningMachines.R2R.domain.course.repository.CourseRepository;
import RunningMachines.R2R.domain.course.repository.UserCourseRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.s3.S3RequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserCourseCommandService {

    private final UserCourseRepository userCourseRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final S3Provider s3Provider;

    public UserCourseResponseDto saveUserCourse(String email, MultipartFile gpx, UserCourseRequestDto userCourseRequestDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Course course = null;
        if (userCourseRequestDto.getCourseId() != null) {
            course = courseRepository.findById(userCourseRequestDto.getCourseId())
                    .orElseThrow(() -> new CustomException(ErrorCode.COURSE_NOT_FOUND));
        }

        // GPX 파일 S3에 업로드
        String gpxUrl = s3Provider.uploadGPX(gpx, S3RequestDto.builder()
                .userId(user.getId())
                .dirName("userCourse")
                .build());

        UserCourse userCourse = userCourseRequestDto.toEntity(user, course)
                .toBuilder()
                .courseUrl(gpxUrl)
                .build();

        userCourseRepository.save(userCourse);

        return UserCourseResponseDto.from(userCourse);
    }
}
