package RunningMachines.R2R.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum GlobalErrorCode implements BaseErrorCode {

    // 유효성 검증 실패
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "ERROR4000", "입력값에 대한 검증에 실패했습니다."),
    // 서버 에러
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "ERROR5000", "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

    @Override
    public ErrorResponse<Void> getErrorResponse() {
        return ErrorResponse.onFailure(code, message);
    }

}