package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
//    @Query("SELECT c.distance FROM Course c WHERE c.fileName = :fileName")
//    double findDistanceByFileName(@Param("fileName") String fileName);

    Course findByFileName(String fileName);

    @Query("SELECT c.courseUrl FROM Course c")
    List<String> findAllCourseUrls();
}
