package RunningMachines.R2R.domain.crew.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailsDto {
    private Long userId;
    private String name;
    private String profileUrl;
    private String membershipDuration;
    private String role;
}
