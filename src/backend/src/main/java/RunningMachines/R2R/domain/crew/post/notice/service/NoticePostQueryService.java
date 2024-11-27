package RunningMachines.R2R.domain.crew.post.notice.service;

import RunningMachines.R2R.domain.crew.board.entity.CrewBoard;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.notice.dto.NoticePostResponseDto;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticePostQueryService {
    private final CrewPostRepository crewPostRepository;

    public NoticePostResponseDto getPostDetail(Long crewId, Long crewpostId) {
        CrewPost noticePost = crewPostRepository.findByIdAndCrewIdAndBoard(crewpostId, crewId, CrewBoard.NOTICE)
                .orElseThrow(() -> new IllegalArgumentException("공지글을 찾을 수 없습니다."));
        return NoticePostResponseDto.fromEntity(noticePost);
    }
}
