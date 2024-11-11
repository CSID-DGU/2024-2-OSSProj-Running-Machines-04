package RunningMachines.R2R.domain.community.post.dto;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostCreateRequestDto {
    private String title;
    private String content;

    @Builder
    public PostCreateRequestDto(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public Post toEntity(User user, Board board) {
        return Post.builder()
                .title(title)
                .content(content)
                .user(user)
                .board(board)
                .build();
    }
}
