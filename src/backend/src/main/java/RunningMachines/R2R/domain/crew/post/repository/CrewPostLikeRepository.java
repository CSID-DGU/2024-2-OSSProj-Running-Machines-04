package RunningMachines.R2R.domain.crew.post.repository;

import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import RunningMachines.R2R.domain.crew.post.entity.CrewPostLike;

import java.util.Optional;

public interface CrewPostLikeRepository extends JpaRepository<CrewPostLike, Integer> {
    boolean existsByCrewPostAndUser(CrewPost crewPost, User user);

    Optional<CrewPostLike> findByCrewPostAndUser(CrewPost crewPost, User user);
}
