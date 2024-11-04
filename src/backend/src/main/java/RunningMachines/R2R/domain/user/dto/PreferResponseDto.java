package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.user.entity.Prefer;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreferResponseDto {
    private Long id;
    private String elevation;
    private boolean convenience;
    private boolean nature;
    private Long userId;

    public static PreferResponseDto from(Prefer prefer) {
        return PreferResponseDto.builder()
                .id(prefer.getId())
                .elevation(prefer.getElevation().name())
                .convenience(prefer.isConvenience())
                .nature(prefer.isNature())
                .userId(prefer.getUser().getId())
                .build();
    }
}
