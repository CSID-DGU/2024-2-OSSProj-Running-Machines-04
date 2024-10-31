package RunningMachines.R2R.domain.user.controller;

import RunningMachines.R2R.domain.user.dto.PreferRequestDto;
import RunningMachines.R2R.domain.user.dto.PreferResponseDto;
import RunningMachines.R2R.domain.user.dto.UserResponseDto;
import RunningMachines.R2R.domain.user.service.UserQueryService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import RunningMachines.R2R.global.auth.TokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "User", description = "사용자 관련 API")
public class UserController {

    private final UserQueryService userQueryService;
    private final TokenProvider tokenProvider;

    // 헤더 토큰을 가져와서 getAuthentication으로 유저 정보 추출
    @GetMapping("/user-info-1")
    public ResponseEntity<UserResponseDto> getUserInfo(HttpServletRequest request) {
        // 헤더에서 토큰 가져오기
        String token = request.getHeader("Authorization").substring(7); // "Bearer " 이후의 토큰 값만 가져오기
        // 토큰에서 이메일 정보 추출
        String email = tokenProvider.getAuthentication(token).getName();
        // 유저 정보 조회
        return ResponseEntity.ok(userQueryService.getUserInfo(email));
    }

    // @AuthenticationPrincipal 통해 유저 정보 추출
    @GetMapping("/user-info-2")
    public ResponseEntity<UserResponseDto> getUserInfo1(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(userQueryService.getUserInfo(customUserDetails.getUsername()));
    }
}
