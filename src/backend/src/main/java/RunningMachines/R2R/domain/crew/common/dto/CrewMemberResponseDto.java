package RunningMachines.R2R.domain.crew.common.dto;

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
}
