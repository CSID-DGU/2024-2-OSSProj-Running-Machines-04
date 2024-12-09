package RunningMachines.R2R.domain.crew.post.gallery.comment.repository;

import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.entity.CrewPostComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewPostCommentRepository extends JpaRepository<CrewPostComment, Long> {
    List<CrewPostComment> findByCrewPost(CrewPost crewPost);
}
