package RunningMachines.R2R.global.auth;

import lombok.Data;

@Data
public class TokenRequestDto {
    private String accessToken;
    private String refreshToken;
}
