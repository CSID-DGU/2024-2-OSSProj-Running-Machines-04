package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.course.entity.UserCourse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRecentResponseDto {
    private double distance;
    private int duration;
    private double pace;
    private LocalDateTime createdAt;

    public static UserRecentResponseDto of(UserCourse userCourse) {
        return UserRecentResponseDto.builder()
                .distance(userCourse.getDistance())
                .duration(userCourse.getDuration())
                .pace(userCourse.getPace())
                .createdAt(userCourse.getCreatedAt())
                .build();
    }
}
