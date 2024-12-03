package RunningMachines.R2R.domain.crew.post.repository;

import RunningMachines.R2R.domain.crew.board.entity.CrewBoard;
import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CrewPostRepository extends JpaRepository<CrewPost, Long> {
    int countByCrewId(Long crewId);

    List<CrewPost> findAllByCrewIdAndBoard(Long crewId, CrewBoard board);

    Optional<CrewPost> findByIdAndCrewIdAndBoard(Long id, Long crewId, CrewBoard board);
}
