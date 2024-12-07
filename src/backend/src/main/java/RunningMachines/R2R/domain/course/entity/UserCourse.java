package RunningMachines.R2R.domain.course.entity;

import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserCourse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String courseUrl;

    private double distance;  // 달린 거리 (km)

    private int duration;  // 달린 시간 (분)

    private double pace;  // 페이스 (km당 시간)

//    private Boolean followRecommendCourse; // 추천 코스 따라 간 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course; // 코스 따라 뛰는 경우에 Course 받아옴

    @OneToMany(mappedBy = "userCourse", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

}
