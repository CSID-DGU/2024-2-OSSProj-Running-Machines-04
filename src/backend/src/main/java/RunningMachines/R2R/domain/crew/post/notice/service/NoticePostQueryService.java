package RunningMachines.R2R.domain.crew.post.notice.service;

import RunningMachines.R2R.domain.crew.board.entity.CrewBoard;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.post.entity.CrewPost;
import RunningMachines.R2R.domain.crew.post.notice.dto.CrewMainNoticeResponseDto;
import RunningMachines.R2R.domain.crew.post.notice.dto.NoticePostResponseDto;
import RunningMachines.R2R.domain.crew.post.notice.dto.NoticePostSimpleResponseDto;
import RunningMachines.R2R.domain.crew.post.repository.CrewPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticePostQueryService {
    private final CrewPostRepository crewPostRepository;
    private final CrewRepository crewRepository;

    public NoticePostResponseDto getPostDetail(Long crewId, Long crewpostId) {
        CrewPost noticePost = crewPostRepository.findByIdAndCrewIdAndBoard(crewpostId, crewId, CrewBoard.NOTICE)
                .orElseThrow(() -> new IllegalArgumentException("공지글을 찾을 수 없습니다."));
        return NoticePostResponseDto.fromEntity(noticePost);
    }

    public CrewMainNoticeResponseDto getNoticePostsByCrew(Long crewId) {
        // 크루 정보 조회
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("크루를 찾을 수 없습니다."));

        // 공지글 조회
        List<CrewPost> noticePosts = crewPostRepository.findAllByCrewIdAndBoard(crewId, CrewBoard.NOTICE);

        // 공지글 미리보기
        List<NoticePostSimpleResponseDto> noticePostSimpleResponseDtos = noticePosts.stream()
                .map(NoticePostSimpleResponseDto::fromEntity)
                .collect(Collectors.toList());

        // 크루 프로필 이미지 URL 가져오기
        String crewProfileImage = crew.getImages() != null ? crew.getImages().getImageUrl() : null;

        return CrewMainNoticeResponseDto.of(
                crew.getTitle(),
                crewProfileImage,
                noticePosts.size(),
                crew.getCrewUsers().size(),
                noticePostSimpleResponseDtos
        );
    }
}
