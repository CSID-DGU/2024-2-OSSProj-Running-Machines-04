package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.user.entity.Prefer;
import RunningMachines.R2R.domain.user.entity.Preference;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoResponseDto {

    private String nickName;
    private String profileImageUrl;
    private Preference elevation;
    private Preference convenience;
    private Preference track;

    public static UserInfoResponseDto from(User user) {
        return UserInfoResponseDto.builder()
                .nickName(user.getNickname())
                .profileImageUrl(user.getProfileImageUrl())
                .elevation(user.getPrefer().getElevation())
                .convenience(user.getPrefer().getConvenience())
                .track(user.getPrefer().getTrack())
                .build();
    }
}
