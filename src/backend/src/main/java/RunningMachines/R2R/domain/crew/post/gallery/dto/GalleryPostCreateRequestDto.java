package RunningMachines.R2R.domain.crew.post.gallery.dto;

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
public class GalleryPostCreateRequestDto {
    private String content;

    public void validate() {
        if (content == null || content.isBlank()) {
            throw new IllegalArgumentException("내용은 필수 입력 사항입니다.");
        }
    }
}
