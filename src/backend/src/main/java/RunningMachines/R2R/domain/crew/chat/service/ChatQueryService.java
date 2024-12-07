package RunningMachines.R2R.domain.crew.chat.service;

import RunningMachines.R2R.domain.crew.chat.dto.ChatMessageResponseDto;
import RunningMachines.R2R.domain.crew.chat.repository.ChatMessageRepository;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatQueryService {
    private final ChatMessageRepository chatMessageRepository;
    private final CrewRepository crewRepository;

    public List<ChatMessageResponseDto> getChatMessages(Long crewId) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("크루를 찾을 수 없습니다."));

        return chatMessageRepository.findByCrewOrderByCreatedAtAsc(crew)
                .stream()
                .map(crewChatMessage -> ChatMessageResponseDto.builder()
                        .crewId(crew.getId())
                        .senderNickname(crewChatMessage.getSender().getNickname())
                        .content(crewChatMessage.getContent())
                        .imageUrls(crewChatMessage.getChatImages().stream()
                                .map(crewChatImage -> crewChatImage.getImageUrl())
                                .collect(Collectors.toList()))
                        .createdAt(crewChatMessage.getCreatedAt().format(DateTimeFormatter.ofPattern("MM-dd HH:mm")))
                        .build())
                .collect(Collectors.toList());
    }
}
