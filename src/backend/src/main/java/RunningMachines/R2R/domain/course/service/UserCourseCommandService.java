package RunningMachines.R2R.domain.course.service;

import RunningMachines.R2R.domain.course.dto.UserCourseRequestDto;
import RunningMachines.R2R.domain.course.dto.UserCourseResponseDto;
import RunningMachines.R2R.domain.course.entity.UserCourse;
import RunningMachines.R2R.domain.course.repository.UserCourseRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import RunningMachines.R2R.global.s3.S3Provider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCourseCommandService {

    private final UserCourseRepository userCourseRepository;
    private final UserRepository userRepository;
    private final S3Provider s3Provider;

    public UserCourseResponseDto saveUserCourse(String email, UserCourseRequestDto userCourseRequestDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // GPX 파일 생성 및 S3에 업로드
        String gpxUrl = s3Provider.saveWaypointsAsGpx(userCourseRequestDto.getWaypoints(), user.getId());

        UserCourse userCourse = userCourseRequestDto.toEntity(user)
                .toBuilder()
                .courseUrl(gpxUrl)
                .build();

        userCourseRepository.save(userCourse);

        return UserCourseResponseDto.from(userCourse);
    }
}
