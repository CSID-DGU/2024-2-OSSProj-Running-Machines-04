package RunningMachines.R2R.domain.crew.chat.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ChatMessageResponseDto {
    private Long crewId;
    private String senderNickname;
    private String content;
    private List<String> imageUrls;
    private String createdAt;
}
