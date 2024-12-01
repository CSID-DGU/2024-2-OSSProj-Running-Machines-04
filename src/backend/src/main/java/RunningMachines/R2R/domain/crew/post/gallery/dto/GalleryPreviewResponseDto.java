package RunningMachines.R2R.domain.crew.post.gallery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class GalleryPreviewResponseDto {
    private String crewTitle;
    private int postCount;
    private int memberCount;
    private List<GallerySimpleResponseDto> posts;
}
