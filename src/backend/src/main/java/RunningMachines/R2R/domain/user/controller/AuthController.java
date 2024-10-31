package RunningMachines.R2R.domain.user.controller;

import RunningMachines.R2R.domain.user.dto.UserLoginRequestDto;
import RunningMachines.R2R.domain.user.dto.UserResponseDto;
import RunningMachines.R2R.domain.user.dto.UserSignupRequestDto;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import RunningMachines.R2R.global.auth.TokenDto;
import RunningMachines.R2R.global.auth.TokenRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "회원가입/로그인 관련 API")
public class AuthController {

    private final AuthCommandService authCommandService;

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserSignupRequestDto userSignupRequestDto) {
        return ResponseEntity.ok(authCommandService.signup(userSignupRequestDto));
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
}
