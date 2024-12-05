package RunningMachines.R2R.domain.user.controller;

import RunningMachines.R2R.domain.user.dto.UserDistanceDto;
import RunningMachines.R2R.domain.user.dto.UserInfoResponseDto;
import RunningMachines.R2R.domain.user.dto.UserRecentResponseDto;
import RunningMachines.R2R.domain.user.dto.UserStatsResponseDto;
import RunningMachines.R2R.domain.user.service.MyPageQueryService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
@Tag(name = "MyPage", description = "마이페이지 관련 API")
public class MyPageController {

    private final MyPageQueryService myPageQueryService;

    @Operation(summary = "유저 정보")
    @PostMapping(value = "/userInfo")
    public ResponseEntity<UserInfoResponseDto> signup(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(myPageQueryService.getUserInfo(customUserDetails.getUsername()));
    }

    @Operation(summary = "달린 거리 달력")
    @GetMapping("/{year}/{month}")
    public ResponseEntity<List<UserDistanceDto>> getUserRunningDistance(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable int year, @PathVariable int month) {
        return ResponseEntity.ok(myPageQueryService.getUserDistance(customUserDetails.getUsername(), year, month));
    }

    @Operation(summary = "최근 기록 2개")
    @GetMapping("/recent")
    public ResponseEntity<List<UserRecentResponseDto>> getUserRecentRunning(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(myPageQueryService.getUserRecentRunning(customUserDetails.getUsername()));
    }

    @Operation(summary = "주/월별 통계")
    @GetMapping("/stats")
    public ResponseEntity<UserStatsResponseDto> getUserStats(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam String period) {
        return ResponseEntity.ok(myPageQueryService.getUserStats(customUserDetails.getUsername(), period));
    }
}
