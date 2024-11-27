package RunningMachines.R2R.domain.crew.common.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CrewProfileImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "crew_id", nullable = false)
    private Crew crew;

    private String imageUrl;

    public void setCrew(Crew crew) {
        this.crew = crew;
    }
}
