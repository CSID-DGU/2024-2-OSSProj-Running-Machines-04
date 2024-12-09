package RunningMachines.R2R.domain.crew.chat.service;

import RunningMachines.R2R.domain.crew.chat.dto.ChatMessageCreateRequestDto;
import RunningMachines.R2R.domain.crew.chat.dto.ChatMessageResponseDto;
import RunningMachines.R2R.domain.crew.chat.entity.CrewChatImage;
import RunningMachines.R2R.domain.crew.chat.entity.CrewChatMessage;
import RunningMachines.R2R.domain.crew.chat.repository.ChatMessageRepository;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.s3.S3RequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatCommandService {
    private final ChatMessageRepository chatMessageRepository;
    private final CrewRepository crewRepository;
    private final S3Provider s3Provider;

    public ChatMessageResponseDto createChatMessage(Long crewId, User sender, ChatMessageCreateRequestDto requestDto) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("크루를 찾을 수 없습니다."));

        CrewChatMessage chatMessage = CrewChatMessage.builder()
                .crew(crew)
                .sender(sender)
                .content(requestDto.getContent())
                .build();

        List<MultipartFile> images = requestDto.getImages();
        if (images!=null) {
            for (MultipartFile image : images) {
                String imageUrl = s3Provider.uploadFile(image, S3RequestDto.builder()
                        .userId(sender.getId())
                        .dirName("chat-images")
                        .build());
                CrewChatImage chatImage = CrewChatImage.builder()
                        .imageUrl(imageUrl)
                        .build();
                chatMessage.addChatImage(chatImage);
            }
        }
        chatMessageRepository.save(chatMessage);

        return ChatMessageResponseDto.builder()
                .crewId(crew.getId())
                .senderNickname(sender.getNickname())
                .content(chatMessage.getContent())
                .imageUrls(chatMessage.getChatImages() == null ? List.of() :chatMessage.getChatImages().stream()
                        .map(CrewChatImage::getImageUrl)
                        .collect(Collectors.toList()))
                .createdAt(chatMessage.getCreatedAt().format(DateTimeFormatter.ofPattern("MM-dd HH:mm")))
                .build();
    }
}
