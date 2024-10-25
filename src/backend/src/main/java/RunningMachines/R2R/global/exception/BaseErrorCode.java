package RunningMachines.R2R.global.exception;

import org.springframework.http.HttpStatus;

public interface BaseErrorCode {

    HttpStatus getHttpStatus();
    String getCode();
    String getMessage();
    ErrorResponse<Void> getErrorResponse();
}
