package RunningMachines.R2R.domain.crew.post.entity;

import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CrewPostLike extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_post_id", nullable = false)
    private CrewPost crewPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
