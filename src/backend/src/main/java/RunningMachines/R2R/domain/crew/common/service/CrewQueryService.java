package RunningMachines.R2R.domain.crew.common.service;

import RunningMachines.R2R.domain.crew.common.dto.CrewResponseDto;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewQueryService {

    private final CrewRepository crewRepository;

    public List<CrewResponseDto> getAllCrews() {
        return crewRepository.findAll().stream()
                .map(CrewResponseDto::from)
                .toList();
    }
}

