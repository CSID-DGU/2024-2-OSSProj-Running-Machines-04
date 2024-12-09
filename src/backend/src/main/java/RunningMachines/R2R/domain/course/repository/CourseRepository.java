package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findByFileName(String fileName);

    @Query("SELECT c FROM Course c LEFT JOIN UserCourse uc ON uc.course.id = c.id GROUP BY c HAVING COUNT(uc) > 0 ORDER BY COUNT(uc) DESC")
    List<Course> findTop10ByUserCourseCount(Pageable pageable);
}
