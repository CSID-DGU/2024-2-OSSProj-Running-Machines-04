package RunningMachines.R2R.domain.user.repository;

import RunningMachines.R2R.domain.user.entity.Prefer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferRepository extends JpaRepository<Prefer, Long> {
}
