package RunningMachines.R2R.domain.crew.common.repository;

import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.entity.CrewUser;
import RunningMachines.R2R.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CrewUserRepository extends JpaRepository<CrewUser, Long> {
    Optional<CrewUser> findByCrewAndUser(Crew crew, User user);
}
