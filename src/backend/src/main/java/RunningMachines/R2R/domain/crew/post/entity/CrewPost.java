package RunningMachines.R2R.domain.crew.post.entity;

import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.board.entity.CrewBoard;
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
public class CrewPost extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String title;

    private String content;

    @Enumerated(EnumType.STRING)
    private CrewBoard board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "crewPost")
    private List<CrewPostComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "crewPost")
    private List<CrewPostImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "crewPost")
    private List<CrewPostLike> likes = new ArrayList<>();

    public int getLikeCount() {
        return likes.size();
    }
}
