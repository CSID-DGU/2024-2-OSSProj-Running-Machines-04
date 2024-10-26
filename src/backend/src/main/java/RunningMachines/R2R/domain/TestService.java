package RunningMachines.R2R.domain;

import jakarta.validation.constraints.NotBlank;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class TestService {

    // 데이터 무결성 예외를 발생시키는 메서드
    public void testDataIntegrityViolation() {
        throw new DataIntegrityViolationException("데이터 무결성 위반 발생");
    }

    // 유효성 검사 실패 예외를 발생시키는 메서드
    public void testValidationError() {
        validateInput(""); // 빈 문자열로 유효성 검사 실패 발생
    }

    // 유효성 검사를 위한 간단한 메서드
    private void validateInput(@NotBlank(message = "입력 값은 공백일 수 없습니다.") String input) {
        // 유효성 검사 실패 시 ConstraintViolationException 발생
    }
}
