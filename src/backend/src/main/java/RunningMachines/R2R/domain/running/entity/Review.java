package RunningMachines.R2R.domain.running.entity;

import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

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

    private int rating;  // 별점 (1~5점)

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private int elevation;

    private int together;

    private int convenience;

    @Enumerated(EnumType.STRING)
    private ReviewTag tag;

    private String summary; // 한줄평

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_course_id")
    private UserCourse userCourse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

}
