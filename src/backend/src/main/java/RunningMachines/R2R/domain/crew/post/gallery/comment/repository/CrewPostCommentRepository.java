package RunningMachines.R2R.domain.crew.post.gallery.comment.repository;

import RunningMachines.R2R.domain.crew.post.entity.CrewPostComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewPostCommentRepository extends JpaRepository<CrewPostComment, Long> {
}
