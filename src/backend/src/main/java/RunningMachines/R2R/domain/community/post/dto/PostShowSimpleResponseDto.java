package RunningMachines.R2R.domain.community.post.dto;

import RunningMachines.R2R.domain.community.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class PostShowSimpleResponseDto {
    private String title;
    private String writer;
    private LocalDateTime createdAt;
    private int commentCount;

    public static PostShowSimpleResponseDto fromPost(Post post) {
        return PostShowSimpleResponseDto.builder()
                .title(post.getTitle())
                .writer(post.getUser().getNickname())
                .createdAt(post.getCreatedAt())
                .commentCount(post.getComments().size())
                .build();
    }
}
