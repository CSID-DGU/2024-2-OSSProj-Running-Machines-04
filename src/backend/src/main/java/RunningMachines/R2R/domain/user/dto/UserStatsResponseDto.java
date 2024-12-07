package RunningMachines.R2R.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserStatsResponseDto   {
    private double distance;
    private double duration;
    private double pace;
}
