package RunningMachines.R2R.domain.community.comment.repository;

import RunningMachines.R2R.domain.community.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdAndParentCommentIsNull(Long postId);
    List<Comment> findByParentCommentId(Long parentCommentId);
}
