package RunningMachines.R2R.domain.home.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TodayRunResponseDto {
    private double totalDistance;
    private String averagePace;
    private int totalDuration;
}
