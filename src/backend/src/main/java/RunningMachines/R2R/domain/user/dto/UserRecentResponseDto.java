package RunningMachines.R2R.domain.user.dto;

import RunningMachines.R2R.domain.course.entity.UserCourse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRecentResponseDto {
    private double distance;
    private int duration;
    private double pace;
    private List<String> tags;
    private LocalDateTime createdAt;

    public static UserRecentResponseDto of(UserCourse userCourse, List<String> tags) {
        return UserRecentResponseDto.builder()
                .distance(userCourse.getDistance())
                .duration(userCourse.getDuration())
                .pace(userCourse.getPace())
                .tags(tags)
                .createdAt(userCourse.getCreatedAt())
                .build();
    }
}
