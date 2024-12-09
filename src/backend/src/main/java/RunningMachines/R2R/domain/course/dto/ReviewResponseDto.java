package RunningMachines.R2R.domain.course.dto;

import RunningMachines.R2R.domain.course.entity.Difficulty;
import RunningMachines.R2R.domain.course.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponseDto {
    private Long reviewId;
    private Difficulty difficulty;
    private List<Long> tags; // 태그 리스트

    public static ReviewResponseDto from(Review review) {
        return ReviewResponseDto.builder()
                .reviewId(review.getId())
                .difficulty(review.getDifficulty())
                .tags(review.getReviewTags().stream()
                                .map(reviewTag -> reviewTag.getTag().getId())
                                .toList()
                )
                .build();
    }
}
