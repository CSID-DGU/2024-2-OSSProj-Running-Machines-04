package RunningMachines.R2R.domain.crew.entity;

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
public class Crew extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String title;

    private int passcode; // 크루 가입 코드

    @OneToMany(mappedBy = "crew")
    private List<CrewUser> crewUsers = new ArrayList<>();

    @OneToMany(mappedBy = "crew")
    private List<CrewPost> crewPosts = new ArrayList<>();
}
