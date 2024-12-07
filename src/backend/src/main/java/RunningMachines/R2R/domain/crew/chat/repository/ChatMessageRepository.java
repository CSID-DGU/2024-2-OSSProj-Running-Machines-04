package RunningMachines.R2R.domain.crew.chat.repository;

import RunningMachines.R2R.domain.crew.chat.entity.CrewChatMessage;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<CrewChatMessage, Long> {
    List<CrewChatMessage> findByCrewOrderByCreatedAtAsc(Crew crew);
}
