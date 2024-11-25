package RunningMachines.R2R.domain.crew.post.notice.service;

import RunningMachines.R2R.domain.crew.board.entity.CrewBoard;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.entity.CrewRole;
import RunningMachines.R2R.domain.crew.common.entity.CrewUser;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.common.repository.CrewUserRepository;
import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.notice.dto.NoticePostCreateRequestDto;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostRepository;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticePostCommandService {
    private final CrewPostRepository crewPostRepository;
    private final CrewUserRepository crewUserRepository;
    private final CrewRepository crewRepository;

    @Transactional
    public void createNoticePost(Long crewId, User user, NoticePostCreateRequestDto noticePostCreateRequestDto) {
        Crew crew = validateCrew(crewId);
        validateLeader(crew, user);

        CrewPost crewPost = CrewPost.builder()
                .title(noticePostCreateRequestDto.getTitle())
                .content(noticePostCreateRequestDto.getContent())
                .board(CrewBoard.NOTICE)
                .crew(crew)
                .user(user)
                .build();

        crewPostRepository.save(crewPost);
    }

    private Crew validateCrew(Long crewId) {
        return crewRepository.findById(crewId)
                .orElseThrow(()-> new IllegalArgumentException("크루를 찾을 수 없습니다."));
    }

    private void validateLeader(Crew crew, User user) {

        CrewUser crewUser = crewUserRepository.findByCrewAndUser(crew, user)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자는 크루에 속해 있지 않습니다."));

        if (crewUser.getRole() != CrewRole.LEADER) {
            throw new IllegalArgumentException("공지글 작성 권한이 없습니다.");
        }
    }
}
