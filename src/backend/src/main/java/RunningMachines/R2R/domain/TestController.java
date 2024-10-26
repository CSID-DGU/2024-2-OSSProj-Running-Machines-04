package RunningMachines.R2R.domain;

import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    // CustomException을 발생시키는 테스트 엔드포인트
    @GetMapping("/custom-error")
    public void triggerCustomException() {
        throw new CustomException(ErrorCode.USER_ALREADY_EXIST);
    }

    // 일반 Exception을 발생시키는 테스트 엔드포인트
    @GetMapping("/internal-error")
    public void triggerInternalServerError() {
        throw new RuntimeException();
    }

    // 데이터 무결성 예외를 발생시키는 엔드포인트
    @GetMapping("/data-integrity")
    public void triggerDataIntegrityViolation() {
        testService.testDataIntegrityViolation();
    }

    // 유효성 검사 실패 예외를 발생시키는 엔드포인트
    @GetMapping("/validation-error")
    public void triggerValidationException() {
        testService.testValidationError();
    }
}
