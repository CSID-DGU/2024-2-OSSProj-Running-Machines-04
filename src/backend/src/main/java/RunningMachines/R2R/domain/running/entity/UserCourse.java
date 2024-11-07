package RunningMachines.R2R.domain.running.entity;

import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserCourse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String courseUrl;

    private int distance;  // 달린 거리

    private int duration;  // 달린 시간

    private int pace;  // 페이스 (km당 시간)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "userCourse")
    private List<Review> reviews = new ArrayList<>();

}
