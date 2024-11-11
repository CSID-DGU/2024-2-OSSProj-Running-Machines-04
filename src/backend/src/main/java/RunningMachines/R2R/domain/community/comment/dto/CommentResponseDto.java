package RunningMachines.R2R.domain.community.comment.dto;

import RunningMachines.R2R.domain.community.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@Builder
public class CommentResponseDto {
    private Long commentId;
    private String writerNickname;
    private String content;
    private LocalDateTime createdAt;
    private List<CommentResponseDto> replies;
    private int likeCount;

    public static CommentResponseDto from(Comment comment) {
        return CommentResponseDto.builder()
                .commentId(comment.getId())
                .writerNickname(comment.getUser().getNickname())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .replies(comment.getReplies().stream()
                        .map(CommentResponseDto::from)
                        .collect(Collectors.toList()))
                .likeCount(comment.getHearts().size())
                .build();
    }
}
