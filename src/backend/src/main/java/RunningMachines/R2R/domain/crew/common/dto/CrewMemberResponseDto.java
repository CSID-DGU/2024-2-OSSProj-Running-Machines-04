package RunningMachines.R2R.domain.crew.common.dto;

import RunningMachines.R2R.domain.user.dto.UserDistanceResponseDto;
import RunningMachines.R2R.domain.user.dto.UserRecentResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewMemberResponseDto {
    private String crewTitle;
    private int postCount;
    private int memberCount;
    private List<MemberDetailsDto> members;
    private List<UserDistanceResponseDto> userDistance;
    private List<UserRecentResponseDto> recentRuns;
}
