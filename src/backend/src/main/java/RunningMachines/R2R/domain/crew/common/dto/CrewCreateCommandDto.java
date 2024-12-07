package RunningMachines.R2R.domain.crew.common.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CrewCreateCommandDto {
    private String title;
    private MultipartFile certificationImage;
    private MultipartFile profileImage;

    public void validate() {
        if (title==null || title.isEmpty()) {
            throw new IllegalArgumentException("크루명을 입력해주세요");
        }
        if (certificationImage == null || certificationImage.isEmpty()) {
            throw new IllegalArgumentException("인증 사진을 입력해주세요.");
        }
        if (profileImage == null || profileImage.isEmpty()) {
            throw new IllegalArgumentException("프로필 사진을 입력해주세요.");
        }
    }
}
