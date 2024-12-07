package RunningMachines.R2R.domain.crew.post.gallery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class GalleryPostDetailResponseDto {
    private Long postId;
    private String authorNickName;
    private String authorProfileUrl;
    private String createdAt;
    private int likeCount;
    private List<String> imageUrls;
    private String content;
}
