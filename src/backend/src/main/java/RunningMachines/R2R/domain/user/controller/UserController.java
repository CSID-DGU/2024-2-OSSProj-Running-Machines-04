package RunningMachines.R2R.domain.user.controller;

import RunningMachines.R2R.domain.user.dto.PreferRequestDto;
import RunningMachines.R2R.domain.user.dto.PreferResponseDto;
import RunningMachines.R2R.domain.user.service.UserCommandService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserCommandService userCommandService;

    @Operation(summary = "선호도 입력")
    @PostMapping("/user/preference")
    public ResponseEntity<PreferResponseDto> savePrefer(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody PreferRequestDto preferRequestDto) {
        return new ResponseEntity<>(userCommandService.savePrefer(customUserDetails.getUsername(), preferRequestDto), HttpStatus.CREATED);
    }
}
