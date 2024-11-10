package RunningMachines.R2R.domain.community.post.dto;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class PostShowDetailResponseDto {
    private String title;
    private String writer;
    private String content;
    private LocalDateTime createdAt;
    private Board board;
    // TODO - 댓글 추가하기

    public static PostShowDetailResponseDto fromPost(Post post) {
        return PostShowDetailResponseDto.builder()
                .title(post.getTitle())
                .writer(post.getUser().getNickname())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .board(post.getBoard())
                .build();
    }
}
