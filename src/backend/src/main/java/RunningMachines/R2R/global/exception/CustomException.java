package RunningMachines.R2R.global.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final BaseErrorCode errorCode;

    public CustomException(BaseErrorCode errorCode) {
        super(errorCode.getMessage()); // 에러 코드의 기본 메시지를 RuntimeException에 전달
        this.errorCode = errorCode;
    }
}
