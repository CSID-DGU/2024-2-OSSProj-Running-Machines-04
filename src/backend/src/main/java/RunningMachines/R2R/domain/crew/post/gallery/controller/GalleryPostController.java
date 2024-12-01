package RunningMachines.R2R.domain.crew.post.gallery.controller;

import RunningMachines.R2R.domain.crew.post.gallery.comment.dto.CrewPostCommentRequestDto;
import RunningMachines.R2R.domain.crew.post.gallery.comment.dto.CrewPostCommentResponseDto;
import RunningMachines.R2R.domain.crew.post.gallery.comment.repository.CrewPostCommentRepository;
import RunningMachines.R2R.domain.crew.post.gallery.comment.service.CrewPostCommentService;
import RunningMachines.R2R.domain.crew.post.gallery.dto.GalleryPostCreateRequestDto;
import RunningMachines.R2R.domain.crew.post.gallery.dto.GalleryPostDetailResponseDto;
import RunningMachines.R2R.domain.crew.post.gallery.dto.GalleryPreviewResponseDto;
import RunningMachines.R2R.domain.crew.post.gallery.service.GalleryPostCommandService;
import RunningMachines.R2R.domain.crew.post.gallery.service.GalleryPostLikeService;
import RunningMachines.R2R.domain.crew.post.gallery.service.GalleryPostQueryService;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/crew/{crewId}/gallery")
@RequiredArgsConstructor
public class GalleryPostController {
    private final GalleryPostCommandService galleryPostCommandService;
    private final GalleryPostQueryService galleryPostQueryService;
    private final GalleryPostLikeService galleryPostLikeService;
    private final CrewPostCommentRepository crewPostCommentRepository;
    private final CrewPostCommentService crewPostCommentService;

    @PostMapping
    public ResponseEntity<Long> createGalleryPost(@PathVariable Long crewId, @RequestPart("content") GalleryPostCreateRequestDto contentDto, @RequestPart("images") List<MultipartFile> images) {
        Long crewPostId = galleryPostCommandService.createGalleryPost(crewId, contentDto, images);
        return ResponseEntity.ok(crewPostId);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<GalleryPostDetailResponseDto> getGalleryPost(@PathVariable Long crewId, @PathVariable Long postId) {
        GalleryPostDetailResponseDto responseDto = galleryPostQueryService.getGalleryPostDetail(crewId, postId);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping
    public ResponseEntity<GalleryPreviewResponseDto> getGalleryPreview(@PathVariable Long crewId) {
        GalleryPreviewResponseDto responseDto = galleryPostQueryService.getGalleryPreview(crewId);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{crewPostId}/like")
    public ResponseEntity<Void> likeGalleryPost(@PathVariable Long crewId, @PathVariable Long crewPostId) {
        galleryPostLikeService.likeGalleryPost(crewId, crewPostId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Long> createComment(@PathVariable Long crewId, @PathVariable Long postId, @RequestBody CrewPostCommentRequestDto requestDto) {
        Long commentId = crewPostCommentService.createComment(crewId, postId, requestDto);
        return ResponseEntity.ok(commentId);
    }
}
