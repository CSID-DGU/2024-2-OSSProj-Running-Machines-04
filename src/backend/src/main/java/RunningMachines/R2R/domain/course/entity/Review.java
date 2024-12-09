package RunningMachines.R2R.domain.course.entity;

import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_course_id")
    private UserCourse userCourse;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "course_id")
//    private Course course;

    @OneToMany(mappedBy = "review", cascade = CascadeType.PERSIST) // 리뷰가 삭제되어도 리뷰태그는 남긴다 (추천 코스 정보에 반영하기 위해)
    private List<ReviewTag> reviewTags = new ArrayList<>();

    public void addReviewTag(ReviewTag reviewTag) {
        if (this.reviewTags == null) {
            this.reviewTags = new ArrayList<>();
        }
        this.reviewTags.add(reviewTag);
        reviewTag.setReview(this);
    }
}
