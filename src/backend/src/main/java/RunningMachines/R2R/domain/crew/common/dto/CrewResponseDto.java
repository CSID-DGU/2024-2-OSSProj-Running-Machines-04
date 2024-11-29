package RunningMachines.R2R.domain.crew.common.dto;

import RunningMachines.R2R.domain.crew.common.entity.Crew;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewResponseDto {

    private String profileImageUrl;
    private String title;
    private int memberCount;

    public static CrewResponseDto from(Crew crew) {
        return CrewResponseDto.builder()
                .profileImageUrl(crew.getImages() != null ? crew.getImages().getImageUrl() : "")
                .title(crew.getTitle())
                .memberCount(crew.getCrewUsers().size())
                .build();
    }
}
