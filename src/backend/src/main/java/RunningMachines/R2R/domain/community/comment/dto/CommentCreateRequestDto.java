package RunningMachines.R2R.domain.community.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateRequestDto {
    private String content;
    private Long postId;
    private Long parentCommentId;

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
