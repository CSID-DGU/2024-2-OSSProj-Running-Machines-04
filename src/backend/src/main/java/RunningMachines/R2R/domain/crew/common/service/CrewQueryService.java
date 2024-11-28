package RunningMachines.R2R.domain.crew.common.service;

import RunningMachines.R2R.domain.crew.common.dto.CrewMemberResponseDto;
import RunningMachines.R2R.domain.crew.common.dto.CrewResponseDto;
import RunningMachines.R2R.domain.crew.common.dto.MemberDetailsDto;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.entity.CrewUser;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.common.repository.CrewUserRepository;
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

