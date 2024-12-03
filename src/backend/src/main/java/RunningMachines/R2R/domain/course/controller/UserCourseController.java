package RunningMachines.R2R.domain.course.controller;

import RunningMachines.R2R.domain.course.dto.UserCourseResponseDto;
import RunningMachines.R2R.domain.course.dto.UserCourseRequestDto;
import RunningMachines.R2R.domain.course.service.UserCourseCommandService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/running")
@Tag(name = "Running", description = "러닝 기록 관련 API")
@RequiredArgsConstructor
public class UserCourseController {

    private final UserCourseCommandService userCourseService;

    @Operation(summary = "사용자 러닝 기록하기", description = "추천 코스 따라 뛰었다면 courseId에 해당 코스id 넣으면 됩니다")
    @PostMapping("/record")
    public ResponseEntity<UserCourseResponseDto> saveUserCourseRecord(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                                      @RequestPart UserCourseRequestDto userCourseRequestDto,
                                                                      @RequestPart MultipartFile gpx) {
        return ResponseEntity.ok(userCourseService.saveUserCourse(customUserDetails.getUsername(), gpx, userCourseRequestDto));
    }
}
