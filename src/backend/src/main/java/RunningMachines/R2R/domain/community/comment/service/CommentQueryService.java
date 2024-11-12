package RunningMachines.R2R.domain.community.comment.service;

import RunningMachines.R2R.domain.community.comment.dto.CommentResponseDto;
import RunningMachines.R2R.domain.community.comment.entity.Comment;
import RunningMachines.R2R.domain.community.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentQueryService {
    private final CommentRepository commentRepository;

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostIdAndParentCommentIsNull(postId);
        return comments.stream()
                .map(CommentResponseDto::from)
                .collect(Collectors.toList());
    }
}
