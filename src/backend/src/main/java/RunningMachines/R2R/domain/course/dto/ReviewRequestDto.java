package RunningMachines.R2R.domain.course.dto;

import RunningMachines.R2R.domain.course.entity.*;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequestDto {
    private Difficulty difficulty; // 난이도 (EASY, MEDIUM, HARD)
    private List<Long> tagIds;     // 태그 ID 리스트

    public Review toEntity(User user, UserCourse userCourse) {
        return Review.builder()
                .user(user)
                .userCourse(userCourse)
                .difficulty(this.difficulty)
                .build();
    }
}
