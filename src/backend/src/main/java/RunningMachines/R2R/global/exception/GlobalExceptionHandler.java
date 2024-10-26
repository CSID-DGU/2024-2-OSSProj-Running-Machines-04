package RunningMachines.R2R.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 예외 발생 시 Internal Server Error 처리
    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorResponse<String>> handleAllException(Exception e) {
        log.error(">>>>> Internal Server Error: ", e);
        BaseErrorCode errorCode = GlobalErrorCode.INTERNAL_SERVER_ERROR;
        ErrorResponse<String> errorResponse = ErrorResponse.onFailure(
                errorCode.getCode(),
                errorCode.getMessage(),
                e.toString() // 실제 에러 메시지 설정
        );
        return ResponseEntity.internalServerError().body(errorResponse);
    }

    // 커스템 에러 처리
    @ExceptionHandler({CustomException.class})
    public ResponseEntity<ErrorResponse<Void>> handleCustomException(CustomException e) {
        log.warn(">>>>> Custom Exception : {}", e.getMessage());
        BaseErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatus()).body(errorCode.getErrorResponse());
    }

    // 데이터 무결성 예외 처리
    @ExceptionHandler({DataIntegrityViolationException.class})
    public ErrorResponse<Object> handleIntegrityConstraint(DataIntegrityViolationException e) {
        log.warn(">>>>> Data Integrity Violation Exception: {}", e.getMessage());
        BaseErrorCode errorStatus = ErrorCode.USER_ALREADY_EXIST;
        return ErrorResponse.onFailure(errorStatus.getCode(), errorStatus.getMessage());
    }

    // 유효성 검사 실패 예외 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorResponse<Map<String, String>>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String, String> failedValidations = new HashMap<>();
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        fieldErrors.forEach(error -> failedValidations.put(error.getField(), error.getDefaultMessage()));

        ErrorResponse<Map<String, String>> errorResponse = ErrorResponse.onFailure(
                GlobalErrorCode.VALIDATION_FAILED.getCode(),
                GlobalErrorCode.VALIDATION_FAILED.getMessage(),
                failedValidations // 유효성 검사 실패 데이터
        );
        return ResponseEntity.status(ex.getStatusCode()).body(errorResponse);
    }
}
