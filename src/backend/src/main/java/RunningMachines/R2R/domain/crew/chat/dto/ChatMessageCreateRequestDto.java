package RunningMachines.R2R.domain.crew.chat.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class ChatMessageCreateRequestDto {
    private Long crewId;
    private String content;
    private List<MultipartFile> images;

    public static ChatMessageCreateRequestDto of(Long crewId, String content, List<MultipartFile> images) {
        return ChatMessageCreateRequestDto.builder()
                .crewId(crewId)
                .content(content)
                .images(images)
                .build();
    }
}
