package RunningMachines.R2R.domain.community.post.dto;

import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.entity.PostImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@Builder
public class PostShowSimpleResponseDto {
    private String title;
    private String writer;
    private LocalDateTime createdAt;
    private int commentCount;
    private List<String> postImages;

    public static PostShowSimpleResponseDto fromPost(Post post) {
        return PostShowSimpleResponseDto.builder()
                .title(post.getTitle())
                .writer(post.getUser().getNickname())
                .createdAt(post.getCreatedAt())
                .commentCount(post.getComments().size())
                .postImages(post.getPostImages()!=null ?
                        post.getPostImages().stream()
                                .map(PostImage::getImageUrl)
                                .collect(Collectors.toList()) : new ArrayList<>())
                .build();
    }
}
