package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.user.entity.Elevation;
import RunningMachines.R2R.domain.user.entity.Prefer;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PreferRequestDto {
    private Elevation elevation;
    private boolean convenience;
    private boolean nature;

    public Prefer toEntity(User user) {
        return Prefer.builder()
                .user(user)
                .elevation(this.elevation)
                .convenience(this.convenience)
                .nature(this.nature)
                .build();
    }
}