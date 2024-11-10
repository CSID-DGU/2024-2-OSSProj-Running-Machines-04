package RunningMachines.R2R.domain.community.comment.service;

import RunningMachines.R2R.domain.community.comment.dto.CommentCreateRequestDto;
import RunningMachines.R2R.domain.community.comment.entity.Comment;
import RunningMachines.R2R.domain.community.comment.repository.CommentRepository;
import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.repository.PostRepository;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentCommandService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Transactional
    public Long createComment(CommentCreateRequestDto commentCreateRequestDto, User user) {
        Post post = postRepository.findById(commentCreateRequestDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        Comment parentComment = null;
        if (commentCreateRequestDto.getParentCommentId() != null) {
            parentComment = commentRepository.findById(commentCreateRequestDto.getParentCommentId())
                    .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));
        }

        Comment comment = new Comment(commentCreateRequestDto.getContent(), post, user, parentComment);
        commentRepository.save(comment);
        return comment.getId();
    }
}
