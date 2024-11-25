package RunningMachines.R2R.domain.crew.common.repository;

import RunningMachines.R2R.domain.crew.common.entity.CrewUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewUserRepository extends JpaRepository<CrewUser, Integer> {
}
