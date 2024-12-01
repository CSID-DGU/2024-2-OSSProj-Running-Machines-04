package RunningMachines.R2R.domain.user.controller;

import RunningMachines.R2R.domain.user.dto.UserLoginRequestDto;
import RunningMachines.R2R.domain.user.dto.UserResponseDto;
import RunningMachines.R2R.domain.user.dto.UserSignupRequestDto;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import RunningMachines.R2R.domain.user.service.AuthQueryService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import RunningMachines.R2R.global.auth.TokenDto;
import RunningMachines.R2R.global.auth.TokenProvider;
import RunningMachines.R2R.global.auth.TokenRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "회원가입/로그인 관련 API")
public class AuthController {

    private final AuthCommandService authCommandService;
    private final AuthQueryService authQueryService;
    private final TokenProvider tokenProvider;

    @Operation(summary = "회원가입")
    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenDto> signup(@RequestPart UserSignupRequestDto userSignupRequestDto,
                                           @RequestPart(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(authCommandService.signup(userSignupRequestDto, image));
    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return ResponseEntity.ok(authCommandService.login(userLoginRequestDto));
    }

    @Operation(summary = "토큰 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authCommandService.reissue(tokenRequestDto));
    }

    // 헤더 토큰을 가져와서 getAuthentication으로 유저 정보 추출
    @GetMapping("/user-info-1")
    public ResponseEntity<UserResponseDto> getUserInfo(HttpServletRequest request) {
        // 헤더에서 토큰 가져오기
        String token = request.getHeader("Authorization").substring(7); // "Bearer " 이후의 토큰 값만 가져오기
        // 토큰에서 이메일 정보 추출
        String email = tokenProvider.getAuthentication(token).getName();
        // 유저 정보 조회
        return ResponseEntity.ok(authQueryService.getUserInfo(email));
    }

    // @AuthenticationPrincipal 통해 유저 정보 추출
    @GetMapping("/user-info-2")
    public ResponseEntity<UserResponseDto> getUserInfo1(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(authQueryService.getUserInfo(customUserDetails.getUsername()));
    }
}
