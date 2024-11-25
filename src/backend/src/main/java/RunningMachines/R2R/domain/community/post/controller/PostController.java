package RunningMachines.R2R.domain.community.post.controller;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.board.service.BoardService;
import RunningMachines.R2R.domain.community.post.dto.PostCreateRequestDto;
import RunningMachines.R2R.domain.community.post.dto.PostShowDetailResponseDto;
import RunningMachines.R2R.domain.community.post.dto.PostShowSimpleResponseDto;
//import RunningMachines.R2R.domain.community.post.dto.PostUpdateRequestDto;
import RunningMachines.R2R.domain.community.post.dto.PostUpdateRequestDto;
import RunningMachines.R2R.domain.community.post.service.PostCommandService;
import RunningMachines.R2R.domain.community.post.service.PostQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class PostController {
    private final PostCommandService postCommandService;
    private final PostQueryService postQueryService;
    private final BoardService boardService;

    @PostMapping("/{boardName}/post")
    public ResponseEntity<Long> createPost(
            @PathVariable String boardName,
            @RequestParam String title,
            @RequestParam String content,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {

        PostCreateRequestDto postCreateRequestDto = PostCreateRequestDto.builder()
                .title(title)
                .content(content)
                .images(images)
                .build();

        Long postId = postCommandService.createPost(boardName, postCreateRequestDto);
        return ResponseEntity.ok(postId);
    }

    @GetMapping("/{boardName}")
    public ResponseEntity<List<PostShowSimpleResponseDto>> getPostsByBoard(@PathVariable String boardName) {
        Board board = boardService.getCurrentBoard(boardName);
        List<PostShowSimpleResponseDto> response = postQueryService.getPostsByBoard(board);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{boardName}/{postId}")
    public ResponseEntity<PostShowDetailResponseDto> getPostWithComments(@PathVariable String boardName, @PathVariable Long postId) {
        PostShowDetailResponseDto responseDto = postQueryService.getPostWithComments(postId);
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/{boardName}/{postId}")
    public ResponseEntity<PostShowDetailResponseDto> updatePost(
            @PathVariable String boardName,
            @PathVariable Long postId,
            @RequestPart(value = "postUpdateRequestDto") PostUpdateRequestDto postUpdateRequestDto,
            @RequestPart(value = "addImages", required = false) List<MultipartFile> addImages) {

        // null 값에 대해 기본값을 설정
        PostUpdateRequestDto updateRequestWithImages = PostUpdateRequestDto.builder()
                .title(postUpdateRequestDto.getTitle())
                .content(postUpdateRequestDto.getContent())
                .removeImageIds(postUpdateRequestDto.getRemoveImageIds() != null ? postUpdateRequestDto.getRemoveImageIds() : List.of())
                .addImages(addImages != null ? addImages : List.of())
                .build();

        Long updatedPostId = postCommandService.updatePost(postId, updateRequestWithImages);
        PostShowDetailResponseDto responseDto = postQueryService.getPostWithComments(updatedPostId);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{boardName}/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable String boardName, @PathVariable Long postId) {
        postCommandService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}
