package RunningMachines.R2R.domain.user.entity;

import RunningMachines.R2R.global.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Prefer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private boolean experience; // 러닝 경험 여부

    private boolean convenience;  // 편의시설 여부

    private int elevation;  // 고도 (0~10)

    private boolean together;  // 함께 달리기 여부

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

}

