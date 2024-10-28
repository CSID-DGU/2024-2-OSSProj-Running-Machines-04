package RunningMachines.R2R.domain.user.controller;

import RunningMachines.R2R.domain.user.dto.UserLoginRequestDto;
import RunningMachines.R2R.domain.user.dto.UserResponseDto;
import RunningMachines.R2R.domain.user.dto.UserSignupRequestDto;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import RunningMachines.R2R.global.auth.TokenDto;
import RunningMachines.R2R.global.auth.TokenRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthCommandService authCommandService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserSignupRequestDto userSignupRequestDto) {
        return ResponseEntity.ok(authCommandService.signup(userSignupRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return ResponseEntity.ok(authCommandService.login(userLoginRequestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authCommandService.reissue(tokenRequestDto));
    }
}
