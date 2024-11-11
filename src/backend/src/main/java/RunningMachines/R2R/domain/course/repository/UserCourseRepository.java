package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {
}
