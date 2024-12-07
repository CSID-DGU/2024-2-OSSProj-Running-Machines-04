package RunningMachines.R2R.domain.crew.post.notice.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NoticePostCreateRequestDto {
    private String title;
    private String content;
}
