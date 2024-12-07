package RunningMachines.R2R.domain.crew.post.notice.dto;

import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NoticePostResponseDto {
    private String title;
    private String content;
    private String author;
    private String crewName;
    private LocalDateTime createdDate;

    public static NoticePostResponseDto fromEntity(CrewPost crewPost) {
        return NoticePostResponseDto.builder()
                .title(crewPost.getTitle())
                .content(crewPost.getContent())
                .author(crewPost.getUser().getNickname())
                .crewName(crewPost.getCrew().getTitle())
                .createdDate(crewPost.getCreatedAt())
                .build();
    }
}
