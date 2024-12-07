package RunningMachines.R2R.domain.course.dto;

import RunningMachines.R2R.domain.course.entity.UserCourse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCourseResponseDto {
    private Long userCourseId;
    private double distance;
    private int duration;
    private double pace;
    private String courseUrl;

    public static UserCourseResponseDto from(UserCourse userCourse) {
        return UserCourseResponseDto.builder()
                .userCourseId(userCourse.getId())
                .distance(userCourse.getDistance())
                .duration(userCourse.getDuration())
                .pace(userCourse.getPace())
                .courseUrl(userCourse.getCourseUrl())
                .build();
    }
}
