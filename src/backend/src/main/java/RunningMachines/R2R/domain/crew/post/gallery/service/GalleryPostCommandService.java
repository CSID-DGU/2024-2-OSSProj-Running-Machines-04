package RunningMachines.R2R.domain.crew.post.gallery.service;

import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.repository.PostRepository;
import RunningMachines.R2R.domain.crew.board.entity.CrewBoard;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.common.repository.CrewUserRepository;
import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.entity.CrewPostImage;
import RunningMachines.R2R.domain.crew.post.gallery.dto.GalleryPostCreateRequestDto;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.s3.S3RequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GalleryPostCommandService {
    private final CrewPostRepository crewPostRepository;
    private final UserRepository userRepository;
    private final CrewRepository crewRepository;
    private final S3Provider s3Provider;
    private final CrewUserRepository crewUserRepository;
    private final AuthCommandService authCommandService;

    @Transactional
    public Long createGalleryPost(Long crewId, GalleryPostCreateRequestDto galleryPostCreateRequestDto, List<MultipartFile> images) {
        User currentUser = authCommandService.getCurrentUser();

        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("해당 크루를 찾을 수 없습니다"));

        boolean isMember = crewUserRepository.existsByCrewAndUser(crew, currentUser);
        if (!isMember) {
            throw new IllegalArgumentException("크루 회원만 게시글을 작성할 수 있습니다.");
        }

        galleryPostCreateRequestDto.validate();

        if (images == null || images.isEmpty()) {
            throw new IllegalArgumentException("사진은 최소 1개 이상 등록해야 합니다.");
        }

        CrewPost galleryPost = CrewPost.builder()
                .content(galleryPostCreateRequestDto.getContent())
                .user(currentUser)
                .crew(crew)
                .board(CrewBoard.GALLERY)
                .build();

        List<CrewPostImage> crewPostImages = new ArrayList<>();
        for (MultipartFile image : images) {
            String imageUrl = s3Provider.uploadFile(image, S3RequestDto.builder()
                    .userId(currentUser.getId())
                    .dirName("gallery")
                    .build());
            crewPostImages.add(CrewPostImage.builder()
                    .imageUrl(imageUrl)
                    .crewPost(galleryPost)
                    .build());
        }

        galleryPost.setImages(crewPostImages);
        crewPostRepository.save(galleryPost);
        return galleryPost.getId();
    }
}
