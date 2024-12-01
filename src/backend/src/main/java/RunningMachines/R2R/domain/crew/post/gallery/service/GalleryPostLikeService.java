package RunningMachines.R2R.domain.crew.post.gallery.service;

import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.repository.PostRepository;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.entity.CrewPostLike;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostLikeRepository;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostRepository;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.crew.common.entity.Crew;

@Service
@RequiredArgsConstructor
public class GalleryPostLikeService {
    private final CrewPostRepository crewPostRepository;
    private final CrewPostLikeRepository crewPostLikeRepository;
    private final CrewRepository crewRepository;
    private final AuthCommandService authCommandService;

    @Transactional
    public void likeGalleryPost(Long crewId, Long crewPostId) {
        User currentUser = authCommandService.getCurrentUser();

        CrewPost crewPost = crewPostRepository.findById(crewPostId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("크루를 찾을 수 없습니다."));

        boolean isMemberOrLeader = crew.getCrewUsers().stream()
                .anyMatch(crewUser -> crewUser.getUser().equals(currentUser));
        if (!isMemberOrLeader) {
            throw new IllegalArgumentException("좋아요는 크루 멤버만 누를 수 있습니다.");
        }

        boolean alreadyLiked = crewPostLikeRepository.existsByCrewPostAndUser(crewPost, currentUser);
        if (alreadyLiked) {
            throw new IllegalArgumentException("이미 좋아요를 눌렀습니다.");
        }

        CrewPostLike like = CrewPostLike.builder()
                .crewPost(crewPost)
                .user(currentUser)
                .build();
        crewPostLikeRepository.save(like);
    }
}
