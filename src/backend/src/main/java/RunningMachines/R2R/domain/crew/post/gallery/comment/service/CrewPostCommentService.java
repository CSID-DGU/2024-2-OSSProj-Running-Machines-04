package RunningMachines.R2R.domain.crew.post.gallery.comment.service;

import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.entity.CrewPostComment;
import RunningMachines.R2R.domain.crew.post.gallery.comment.dto.CrewPostCommentRequestDto;
import RunningMachines.R2R.domain.crew.post.gallery.comment.dto.CrewPostCommentResponseDto;
import RunningMachines.R2R.domain.crew.post.gallery.comment.repository.CrewPostCommentRepository;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class CrewPostCommentService {
    private final CrewPostRepository crewPostRepository;
    private final CrewPostCommentRepository crewPostCommentRepository;
    private final CrewRepository crewRepository;
    private final AuthCommandService authCommandService;

    @Transactional
    public Long createComment(Long crewId, Long postId, CrewPostCommentRequestDto requestDto) {
        User currentUser = authCommandService.getCurrentUser();

        CrewPost crewPost = crewPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("크루를 찾을 수 없습니다."));

        boolean isMember = crew.getCrewUsers().stream()
                .anyMatch(crewUser -> crewUser.getUser().equals(currentUser));
        if (!isMember) {
            throw new IllegalArgumentException("댓글 작성은 크루 유저만 가능합니다.");
        }

        CrewPostComment comment = CrewPostComment.builder()
                .content(requestDto.getContent())
                .crewPost(crewPost)
                .user(currentUser)
                .build();
        CrewPostComment savedComment = crewPostCommentRepository.save(comment);

        return savedComment.getId();
    }

}
