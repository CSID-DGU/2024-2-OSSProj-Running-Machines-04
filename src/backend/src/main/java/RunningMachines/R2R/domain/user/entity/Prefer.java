package RunningMachines.R2R.domain.user.entity;

import RunningMachines.R2R.global.util.BaseEntity;
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
    private Preference elevation; // 고도

    @Enumerated(EnumType.STRING)
    private Preference convenience; // 편의시설 여부

    @Enumerated(EnumType.STRING)
    private Preference track; // 트랙

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    public void increaseElevation() {
        switch (elevation) {
            case LOW -> this.elevation = Preference.MEDIUM;
            case MEDIUM -> this.elevation = Preference.HIGH;
            case HIGH -> {}
        }
    }

    public void decreaseElevation() {
        switch (elevation) {
            case LOW -> {}
            case MEDIUM -> this.elevation = Preference.LOW;
            case HIGH -> this.elevation = Preference.MEDIUM;
        }
    }
}
