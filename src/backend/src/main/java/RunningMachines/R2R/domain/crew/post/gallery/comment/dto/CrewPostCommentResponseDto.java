package RunningMachines.R2R.domain.crew.post.gallery.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CrewPostCommentResponseDto {
    private Long commentId;
    private String content;
    private String authorName;
    private String authorProfile;
    private String createdAt;
}
