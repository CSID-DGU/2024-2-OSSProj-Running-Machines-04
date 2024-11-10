package RunningMachines.R2R.domain.community.post.controller;

import RunningMachines.R2R.domain.community.post.dto.PostCreateRequestDto;
import RunningMachines.R2R.domain.community.post.service.PostCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class PostController {
    private final PostCommandService postCommandService;

    @PostMapping("/{boardName}")
    public ResponseEntity<Long> createPost(@PathVariable String boardName, @RequestBody PostCreateRequestDto postCreateRequestDto) {
        Long postId = postCommandService.createPost(boardName, postCreateRequestDto);
        return ResponseEntity.ok(postId);
    }
}
