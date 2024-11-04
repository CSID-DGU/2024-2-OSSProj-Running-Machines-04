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

    @Enumerated(EnumType.STRING)
    private Elevation elevation;  // 고도

    private boolean convenience;  // 편의시설 여부

    private boolean nature; // 자연 여부

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

}
