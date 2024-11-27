package RunningMachines.R2R.domain.crew.common.controller;

import RunningMachines.R2R.domain.crew.common.dto.CrewCreateCommandDto;
import RunningMachines.R2R.domain.crew.common.dto.CrewResponseDto;
import RunningMachines.R2R.domain.crew.common.service.CrewCommandService;
import RunningMachines.R2R.domain.crew.common.service.CrewQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/crew")
@RequiredArgsConstructor
public class CrewController {
    private final CrewCommandService crewCommandService;
    private final CrewQueryService crewQueryService;

    @PostMapping("/create")
    public ResponseEntity<Integer> createCrew(@RequestParam String title, @RequestPart MultipartFile certificationImage,@RequestPart MultipartFile profileImage) {
        CrewCreateCommandDto crewCreateCommandDto = CrewCreateCommandDto.builder()
                .title(title)
                .certificationImage(certificationImage)
                .profileImage(profileImage)
                .build();

        Integer crewPasscode = crewCommandService.createCrew(crewCreateCommandDto);

        return ResponseEntity.ok(crewPasscode);
    }

    @GetMapping
    public ResponseEntity<List<CrewResponseDto>> getCrewList() {
        List<CrewResponseDto> crewResponseDtoList = crewQueryService.getAllCrews();
        return ResponseEntity.ok(crewResponseDtoList);
    }
}
