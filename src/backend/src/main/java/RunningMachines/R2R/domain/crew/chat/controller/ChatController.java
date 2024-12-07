package RunningMachines.R2R.domain.crew.chat.controller;

import RunningMachines.R2R.domain.crew.chat.dto.ChatMessageCreateRequestDto;
import RunningMachines.R2R.domain.crew.chat.dto.ChatMessageResponseDto;
import RunningMachines.R2R.domain.crew.chat.entity.CrewChatImage;
import RunningMachines.R2R.domain.crew.chat.entity.CrewChatMessage;
import RunningMachines.R2R.domain.crew.chat.service.ChatCommandService;
import RunningMachines.R2R.domain.crew.chat.service.ChatQueryService;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crew/{crewId}/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatCommandService chatCommandService;
    private final ChatQueryService chatQueryService;
    private final AuthCommandService authCommandService;

    @GetMapping
    public ResponseEntity<List<ChatMessageResponseDto>> getChatMessages(@PathVariable Long crewId) {
        return ResponseEntity.ok(chatQueryService.getChatMessages(crewId));
    }

    @PostMapping
    public ResponseEntity<ChatMessageResponseDto> createChatMessage(@PathVariable Long crewId, @RequestBody ChatMessageCreateRequestDto requestDto) {
        User currentUser = authCommandService.getCurrentUser();
        ChatMessageResponseDto responseDto = chatCommandService.createChatMessage(crewId, currentUser, requestDto);
        return ResponseEntity.ok(responseDto);
    }
}
