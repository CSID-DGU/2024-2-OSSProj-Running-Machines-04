package RunningMachines.R2R.domain.crew.common.repository;

import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.entity.CrewUser;
import RunningMachines.R2R.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CrewUserRepository extends JpaRepository<CrewUser, Long> {
    Optional<CrewUser> findByCrewAndUser(Crew crew, User user);

    @Query("SELECT cu FROM CrewUser cu WHERE cu.crew.id = :crewId")
    List<CrewUser> findByCrewId(@Param("crewId") Long crewId);
}
