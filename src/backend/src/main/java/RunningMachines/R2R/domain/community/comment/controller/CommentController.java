package RunningMachines.R2R.domain.community.comment.controller;

import RunningMachines.R2R.domain.community.comment.dto.CommentCreateRequestDto;
import RunningMachines.R2R.domain.community.comment.dto.CommentResponseDto;
import RunningMachines.R2R.domain.community.comment.repository.CommentRepository;
import RunningMachines.R2R.domain.community.comment.service.CommentCommandService;
import RunningMachines.R2R.domain.community.comment.service.CommentQueryService;
import RunningMachines.R2R.domain.community.post.repository.PostRepository;
import RunningMachines.R2R.domain.community.post.service.PostQueryService;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board/{boardName}/{postId}")
@RequiredArgsConstructor
public class CommentController {
    private final CommentCommandService commentCommandService;

    @PostMapping
    public ResponseEntity<Long> createComment(@PathVariable String boardName, @PathVariable Long postId, @RequestBody CommentCreateRequestDto requestDto) {
        requestDto.setPostId(postId);
        Long commentId = commentCommandService.createComment(requestDto);
        return ResponseEntity.ok(commentId);
    }

    @PostMapping("/{commentId}/like")
    public ResponseEntity<String> toggleLike(@PathVariable String boardName, @PathVariable Long postId, @PathVariable Long commentId) {
        String result = commentCommandService.toggleLike(commentId);
        return ResponseEntity.ok(result);
    }
}
