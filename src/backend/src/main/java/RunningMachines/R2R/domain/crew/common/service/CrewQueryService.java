package RunningMachines.R2R.domain.crew.common.service;

import RunningMachines.R2R.domain.course.repository.UserCourseRepository;
import RunningMachines.R2R.domain.crew.common.dto.CrewMemberResponseDto;
import RunningMachines.R2R.domain.crew.common.dto.CrewResponseDto;
import RunningMachines.R2R.domain.crew.common.dto.MemberDetailsDto;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.entity.CrewUser;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.common.repository.CrewUserRepository;
import RunningMachines.R2R.domain.user.dto.UserDistanceResponseDto;
import RunningMachines.R2R.domain.user.dto.UserRecentResponseDto;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.service.MyPageQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewQueryService {

    private final CrewRepository crewRepository;
    private final CrewUserRepository crewUserRepository;
    private final MyPageQueryService myPageQueryService;

    public List<CrewResponseDto> getAllCrews() {
        return crewRepository.findAll().stream()
                .map(CrewResponseDto::from)
                .toList();
    }

    public CrewMemberResponseDto getCrewMember(Long crewId) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("해당 크루를 찾을 수 없습니다."));

        List<CrewUser> crewUsers = crewUserRepository.findByCrewId(crewId);

        List<MemberDetailsDto> members = crewUsers.stream()
                .map(crewUser -> MemberDetailsDto.builder()
                        .userId(crewUser.getUser().getId())
                        .name(crewUser.getUser().getNickname())
                        .profileUrl(crewUser.getUser().getProfileImageUrl())
                        .membershipDuration(calculationMembershipDuration(crewUser.getCreatedAt()))
                        .role(crewUser.getRole().toString())
                        .build())
                .toList();

        return CrewMemberResponseDto.builder()
                .crewTitle(crew.getTitle())
                .postCount(crew.getCrewPosts().size())
                .memberCount(crewUsers.size())
                .members(members)
                .build();
    }

    public CrewMemberResponseDto getCrewMemberProfile(Long crewId, Long memberId, int year, int month) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("해당 크루를 찾을 수 없습니다."));

        List<CrewUser> crewUsers = crewUserRepository.findByCrewId(crewId);
        CrewUser member = crewUsers.stream()
                .filter(crewUser -> crewUser.getUser().getId().equals(memberId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버를 찾을 수 없습니다."));

        User user = member.getUser();

        // 1. 멤버의 달리기 거리 달력 가져오기 (year, month를 기준으로)
        List<UserDistanceResponseDto> userDistanceResponseDtos = myPageQueryService.getUserDistance(user.getEmail(), year, month);

        // 2. 멤버의 최근 러닝 기록 가져오기
        List<UserRecentResponseDto> recentRuns = myPageQueryService.getUserRecentRunning(user.getEmail());

        List<MemberDetailsDto> members = crewUsers.stream()
                .map(crewUser -> MemberDetailsDto.builder()
                        .userId(crewUser.getUser().getId())
                        .name(crewUser.getUser().getNickname())
                        .profileUrl(crewUser.getUser().getProfileImageUrl())
                        .membershipDuration(calculationMembershipDuration(crewUser.getCreatedAt()))
                        .role(crewUser.getRole().toString())
                        .build())
                .toList();

        // 최종 응답 DTO 생성
        return CrewMemberResponseDto.builder()
                .crewTitle(crew.getTitle())
                .postCount(crew.getCrewPosts().size())
                .memberCount(crewUsers.size())
                .members(members)
                .userDistance(userDistanceResponseDtos)
                .recentRuns(recentRuns)
                .build();
    }

    private String calculationMembershipDuration(LocalDateTime createdAt) {
        long months = ChronoUnit.MONTHS.between(createdAt, LocalDateTime.now());
        if (months < 12) {
            return (months+1) + "m";
        } else {
            long years = months / 12;
            return years + "y";
        }
    }
}

