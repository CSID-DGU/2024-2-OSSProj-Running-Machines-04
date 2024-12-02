package RunningMachines.R2R.domain.course.repository;

import RunningMachines.R2R.domain.course.entity.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {
    @Query("SELECT uc FROM UserCourse uc WHERE uc.user.id = :userId AND uc.createdAt BETWEEN :startDateTime AND :endDateTime")
    List<UserCourse> findByUserIdAndDateRange(
            @Param("userId") Long userId,
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime
    );
}
