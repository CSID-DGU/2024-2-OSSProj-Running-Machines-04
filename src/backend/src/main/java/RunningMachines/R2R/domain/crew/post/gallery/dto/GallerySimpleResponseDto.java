package RunningMachines.R2R.domain.crew.post.gallery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
public class GallerySimpleResponseDto {
    private Long postId;
    private String imageUrl;
    private String content;
}
