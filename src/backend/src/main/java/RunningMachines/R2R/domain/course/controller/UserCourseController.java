package RunningMachines.R2R.domain.course.controller;

import RunningMachines.R2R.domain.course.dto.UserCourseResponseDto;
import RunningMachines.R2R.domain.course.dto.UserCourseRequestDto;
import RunningMachines.R2R.domain.course.service.UserCourseCommandService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/running")
@RequiredArgsConstructor
public class UserCourseController {

    private final UserCourseCommandService userCourseService;

    @PostMapping("/record")
    public ResponseEntity<UserCourseResponseDto> saveUserCourseRecord(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                                      @RequestBody UserCourseRequestDto userCourseRequestDto) {
        return ResponseEntity.ok(userCourseService.saveUserCourse(customUserDetails.getUsername(), userCourseRequestDto));
    }
}
