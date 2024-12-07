package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}
