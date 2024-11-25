package RunningMachines.R2R.domain.community.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostUpdateRequestDto {
    private String title;
    private String content;
    private List<MultipartFile> addImages;
    private List<Long> removeImageIds;
}
