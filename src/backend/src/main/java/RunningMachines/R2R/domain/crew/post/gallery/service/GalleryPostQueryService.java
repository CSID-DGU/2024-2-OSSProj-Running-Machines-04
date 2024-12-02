package RunningMachines.R2R.domain.crew.post.gallery.service;

import RunningMachines.R2R.domain.crew.board.entity.CrewBoard;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.gallery.dto.GalleryPostDetailResponseDto;
import RunningMachines.R2R.domain.crew.post.gallery.dto.GalleryPreviewResponseDto;
import RunningMachines.R2R.domain.crew.post.gallery.dto.GallerySimpleResponseDto;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryPostQueryService {
    private final CrewPostRepository crewPostRepository;
    private final CrewRepository crewRepository;

    @Transactional(readOnly = true)
    public GalleryPostDetailResponseDto getGalleryPostDetail(Long crewId, Long crewPostId) {
        CrewPost crewPost = crewPostRepository.findById(crewPostId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));

        if (!crewPost.getCrew().getId().equals(crewId)) {
            throw new IllegalArgumentException("요청한 크루에 해당하지 않는 게시글입니다.");
        }

        if (!CrewBoard.GALLERY.name().equals(crewPost.getBoard().name())) {
            throw new IllegalArgumentException("갤러리 게시판의 글이 아닙니다.");
        }

        return GalleryPostDetailResponseDto.builder()
                .postId(crewPost.getId())
                .authorNickName(crewPost.getUser().getNickname())
                .authorProfileUrl(crewPost.getUser().getProfileImageUrl())
                .createdAt(crewPost.getCreatedAt().toString())
                .likeCount(crewPost.getLikeCount())
                .imageUrls(crewPost.getImages().stream()
                        .map(image -> image.getImageUrl())
                        .collect(Collectors.toList()))
                .content(crewPost.getContent())
                .build();
    }

    @Transactional(readOnly = true)
    public GalleryPreviewResponseDto getGalleryPreview(Long crewId) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("해당 크루를 찾을 수 없습니다."));

        int postCount = crewPostRepository.countByCrewId(crewId);
        int memberCount = crew.getCrewUsers().size();

        List<GallerySimpleResponseDto> posts = crewPostRepository.findAllByCrewIdAndBoard(crewId, CrewBoard.GALLERY).stream()
                .filter(post -> !post.getImages().isEmpty())
                .map(post -> GallerySimpleResponseDto.builder()
                        .postId(post.getId())
                        .imageUrl(post.getImages().get(0).getImageUrl())
                        .build())
                .collect(Collectors.toList());

        return GalleryPreviewResponseDto.builder()
                .crewTitle(crew.getTitle())
                .postCount(postCount)
                .memberCount(memberCount)
                .posts(posts)
                .build();
    }
}
