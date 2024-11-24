package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.user.entity.Prefer;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreferResponseDto {
    private Long preferId;
    private String elevation;
    private boolean convenience;
    private boolean nature;
    private Long userId;

    public static PreferResponseDto from(Prefer prefer) {
        return PreferResponseDto.builder()
                .preferId(prefer.getId())
                .elevation(prefer.getElevation().name())
                .convenience(prefer.isConvenience())
                .nature(prefer.isNature())
                .userId(prefer.getUser().getId())
                .build();
    }
}
