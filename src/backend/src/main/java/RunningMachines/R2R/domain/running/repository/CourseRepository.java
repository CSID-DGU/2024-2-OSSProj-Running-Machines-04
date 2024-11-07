package RunningMachines.R2R.domain.running.repository;

import RunningMachines.R2R.domain.running.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
