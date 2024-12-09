package RunningMachines.R2R.domain.home.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class HomePageResponseDto {
    private TodayRunResponseDto todayRun;
    private List<CrewRankResponseDto> topDistanseCrews;
    private List<CrewRankResponseDto> topPaceCrews;
}
