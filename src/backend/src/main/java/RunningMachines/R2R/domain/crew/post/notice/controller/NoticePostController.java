package RunningMachines.R2R.domain.crew.post.notice.controller;

import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.notice.dto.CrewMainNoticeResponseDto;
import RunningMachines.R2R.domain.crew.post.notice.dto.NoticePostCreateRequestDto;
import RunningMachines.R2R.domain.crew.post.notice.dto.NoticePostResponseDto;
import RunningMachines.R2R.domain.crew.post.notice.service.NoticePostCommandService;
import RunningMachines.R2R.domain.crew.post.notice.service.NoticePostQueryService;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import RunningMachines.R2R.domain.user.service.UserCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crew/{crewId}/notice")
@RequiredArgsConstructor
public class NoticePostController {
    private final NoticePostCommandService noticePostCommandService;
    private final NoticePostQueryService noticePostQueryService;
    private final AuthCommandService authCommandService;

    @PostMapping
    public ResponseEntity<Long> createNoticePost(@PathVariable Long crewId, @RequestBody NoticePostCreateRequestDto requestDto) {
        User currentUser = authCommandService.getCurrentUser();
        noticePostCommandService.createNoticePost(crewId, currentUser, requestDto);
        return ResponseEntity.ok(crewId);
    }

    @GetMapping("/{crewPostId}")
    public ResponseEntity<NoticePostResponseDto> getNoticePostDetail(@PathVariable Long crewId, @PathVariable Long crewPostId) {
        return ResponseEntity.ok(noticePostQueryService.getPostDetail(crewId, crewPostId));
    }

    @GetMapping
    public ResponseEntity<CrewMainNoticeResponseDto> getNoticePostsByCrew(@PathVariable Long crewId) {
        return ResponseEntity.ok(noticePostQueryService.getNoticePostsByCrew(crewId));
    }
}
