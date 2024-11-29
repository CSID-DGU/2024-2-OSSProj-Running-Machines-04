package RunningMachines.R2R.domain.crew.post.gallery.controller;

import RunningMachines.R2R.domain.crew.post.gallery.dto.GalleryPostCreateRequestDto;
import RunningMachines.R2R.domain.crew.post.gallery.service.GalleryPostCommandService;
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

    @PostMapping
    public ResponseEntity<Long> createGalleryPost(@PathVariable Long crewId, @RequestPart("content") GalleryPostCreateRequestDto contentDto, @RequestPart("images") List<MultipartFile> images) {
        Long crewPostId = galleryPostCommandService.createGalleryPost(crewId, contentDto, images);
        return ResponseEntity.ok(crewPostId);
    }
}
