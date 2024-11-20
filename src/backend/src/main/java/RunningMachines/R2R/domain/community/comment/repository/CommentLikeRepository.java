package RunningMachines.R2R.domain.community.comment.repository;

import RunningMachines.R2R.domain.community.comment.entity.Comment;
import RunningMachines.R2R.domain.community.comment.entity.CommentLike;
import RunningMachines.R2R.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {
    Optional<CommentLike> findByCommentAndUser(Comment comment, User user);

    // 특정 댓글의 좋아요 수를 계산
    long countByComment(Comment comment);
}
