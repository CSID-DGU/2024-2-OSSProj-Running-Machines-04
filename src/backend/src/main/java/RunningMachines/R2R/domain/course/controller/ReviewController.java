package RunningMachines.R2R.domain.course.controller;

import RunningMachines.R2R.domain.course.dto.ReviewRequestDto;
import RunningMachines.R2R.domain.course.dto.ReviewResponseDto;
import RunningMachines.R2R.domain.course.service.ReviewCommandService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/running")
@Tag(name = "Running", description = "러닝 기록 관련 API")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewCommandService reviewCommandService;

    @Operation(summary = "리뷰 작성",
            description = "userCourseId는 러닝 기록 저장할 때 반환된 id <br> difficulty: LOW, MEDIUM, HIGH <br> tag는 산(1) 나무(2) 강(3) ... 연인(12) 반려동물(13)")
    @PostMapping("/review/{userCourseId}")
    public ResponseEntity<ReviewResponseDto> createReview(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long userCourseId, @RequestBody ReviewRequestDto reviewRequestDto) {
        return ResponseEntity.ok(reviewCommandService.createReview(customUserDetails.getUsername(), userCourseId, reviewRequestDto));
    }
}
