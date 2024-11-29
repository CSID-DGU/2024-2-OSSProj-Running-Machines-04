package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.user.entity.Prefer;
import RunningMachines.R2R.domain.user.entity.Preference;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreferResponseDto {
    private Long preferId;
    private Preference elevation;
    private Preference convenience;
    private Preference track;
    private Long userId;

    public static PreferResponseDto from(Prefer prefer) {
        return PreferResponseDto.builder()
                .preferId(prefer.getId())
                .elevation(prefer.getElevation())
                .convenience(prefer.getConvenience())
                .track(prefer.getTrack())
                .userId(prefer.getUser().getId())
                .build();
    }
}
