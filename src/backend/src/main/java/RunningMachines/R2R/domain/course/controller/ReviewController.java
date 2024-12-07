package RunningMachines.R2R.domain.course.controller;

import RunningMachines.R2R.domain.course.dto.ReviewRequestDto;
import RunningMachines.R2R.domain.course.dto.ReviewResponseDto;
import RunningMachines.R2R.domain.course.service.ReviewCommandService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
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
            description = "difficulty: LOW, MEDIUM, HIGH <br> tag는 산(1) 나무(2) 강(3) ... 연인(12) 반려동물(13) <br> 러닝 기록과 동일하게 추천 코스 따라 뛰었다면 courseId에 해당 코스id 넣으면 됩니다")
    @Parameter(name = "userCourseId", description = "러닝 기록 저장할 때 반환된 id")
    @PostMapping("/review/{userCourseId}")
    public ResponseEntity<ReviewResponseDto> createReview(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long userCourseId, @RequestBody ReviewRequestDto reviewRequestDto) {
        return ResponseEntity.ok(reviewCommandService.createReview(customUserDetails.getUsername(), userCourseId, reviewRequestDto));
    }
}
