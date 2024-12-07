package RunningMachines.R2R.domain.home.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewRankResponseDto {
    private Long crewId;
    private String crewName;
    private String crewProfileUrl;
    private String value;
    private double totalDistance;
    private double averagePace;
}
