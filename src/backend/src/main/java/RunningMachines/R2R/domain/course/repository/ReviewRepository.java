package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}

