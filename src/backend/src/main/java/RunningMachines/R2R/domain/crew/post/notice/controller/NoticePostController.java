package RunningMachines.R2R.domain.crew.post.notice.controller;

import RunningMachines.R2R.domain.crew.post.notice.dto.NoticePostCreateRequestDto;
import RunningMachines.R2R.domain.crew.post.notice.service.NoticePostCommandService;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/crew/{crewId}")
@RequiredArgsConstructor
public class NoticePostController {
    private final NoticePostCommandService noticePostCommandService;
    private final AuthCommandService authCommandService;

    @PostMapping("/notice")
    public ResponseEntity<Long> createNoticePost(@PathVariable Long crewId, @RequestBody NoticePostCreateRequestDto requestDto) {
        User currentUser = authCommandService.getCurrentUser();
        noticePostCommandService.createNoticePost(crewId, currentUser, requestDto);
        return ResponseEntity.ok(crewId);
    }
}
