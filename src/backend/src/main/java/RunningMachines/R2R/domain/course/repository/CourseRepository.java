package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c.distance FROM Course c WHERE c.fileName = :fileName")
    double findDistanceByFileName(@Param("fileName") String fileName);

}
