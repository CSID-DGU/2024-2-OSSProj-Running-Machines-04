package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupRequestDto {
    private String email;
    private String password;
    private String nickname;
    // TODO - 프로필 사진 추가

    public User toEntity(String encodedPassword) {
        return User.builder()
                .email(this.email)
                .password(encodedPassword)
                .nickname(this.nickname)
                .build();
    }
}
