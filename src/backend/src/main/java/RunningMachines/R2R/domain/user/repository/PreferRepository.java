package RunningMachines.R2R.domain.user.repository;

import RunningMachines.R2R.domain.user.entity.Prefer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PreferRepository extends JpaRepository<Prefer, Long> {

    Optional<Prefer> findByUserId(Long id);
}
