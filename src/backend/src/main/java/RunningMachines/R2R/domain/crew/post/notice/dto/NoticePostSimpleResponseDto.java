package RunningMachines.R2R.domain.crew.post.notice.dto;

import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NoticePostSimpleResponseDto {
    private long crewPostId;
    private String title;
    private String author;
    private LocalDateTime lastModified;

    public static NoticePostSimpleResponseDto fromEntity(CrewPost crewPost) {
        return NoticePostSimpleResponseDto.builder()
                .crewPostId(crewPost.getId())
                .title(crewPost.getTitle())
                .author(crewPost.getUser().getNickname())
                .lastModified(crewPost.getUpdatedAt())
                .build();
    }
}
