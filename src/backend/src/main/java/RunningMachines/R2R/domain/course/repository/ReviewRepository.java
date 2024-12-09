package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.userCourse.course.id = :courseId")
    List<Review> findByCourseId(@Param("courseId") Long courseId);
}
