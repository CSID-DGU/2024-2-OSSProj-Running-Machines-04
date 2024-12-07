package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.user.entity.Preference;
import RunningMachines.R2R.domain.user.entity.Prefer;
import RunningMachines.R2R.domain.user.entity.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PreferRequestDto {
    private Preference elevation;
    private Preference convenience;
    private Preference track;

    public Prefer toEntity(User user) {
        return Prefer.builder()
                .user(user)
                .elevation(this.elevation)
                .convenience(this.convenience)
                .track(this.track)
                .build();
    }
}