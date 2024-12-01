package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findByFileName(String fileName);
}
