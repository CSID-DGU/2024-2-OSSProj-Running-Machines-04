package RunningMachines.R2R.domain.community.post.dto;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.entity.PostImage;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@NoArgsConstructor
public class PostCreateRequestDto {
    private String title;
    private String content;
    private List<MultipartFile> images;

    @Builder
    public PostCreateRequestDto(String title, String content, List<MultipartFile> images) {
        this.title = title;
        this.content = content;
        this.images = images;
    }

    public void setImages(List<MultipartFile> postImages) {
        this.images = postImages;
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
