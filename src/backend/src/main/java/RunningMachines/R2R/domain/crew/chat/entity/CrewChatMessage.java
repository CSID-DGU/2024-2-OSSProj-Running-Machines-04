package RunningMachines.R2R.domain.crew.chat.entity;

import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.util.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewChatMessage extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id", nullable = false)
    private Crew crew;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User sender;

    private String content;

    @OneToMany(mappedBy = "chatMessage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CrewChatImage> chatImages = new ArrayList<>();

    public void addChatImage(CrewChatImage crewChatImage) {
        this.chatImages.add(crewChatImage);
        crewChatImage.setChatMessage(this);
    }
}
