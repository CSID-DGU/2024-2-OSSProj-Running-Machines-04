package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.Course;
import RunningMachines.R2R.domain.course.entity.CourseLike;
import RunningMachines.R2R.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseLikeRepository extends JpaRepository<CourseLike, Long> {
    Optional<CourseLike> findByUserAndCourse(User user, Course course);
}
