package RunningMachines.R2R.global.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"code", "message", "result"})
public class ErrorResponse<T> {

    private final String code;
    private final String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T result;

    public static <T> ErrorResponse<T> onFailure(String code, String message, T result) {
        return new ErrorResponse<>(code, message, result);
    }

    public static <T> ErrorResponse<T> onFailure(String code, String message) {
        return new ErrorResponse<>(code, message, null);
    }

    // Json 으로 변환
    public String toJsonString() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(this);
    }
}
