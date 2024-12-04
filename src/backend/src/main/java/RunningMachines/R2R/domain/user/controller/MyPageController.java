package RunningMachines.R2R.domain.user.controller;

import RunningMachines.R2R.domain.user.dto.UserInfoResponseDto;
import RunningMachines.R2R.domain.user.dto.UserSignupRequestDto;
import RunningMachines.R2R.domain.user.service.MyPageQueryService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import RunningMachines.R2R.global.auth.TokenDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
