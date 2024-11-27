package RunningMachines.R2R.domain.crew.common.service;

import RunningMachines.R2R.domain.crew.common.dto.CrewCreateCommandDto;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.entity.CrewProfileImage;
import RunningMachines.R2R.domain.crew.common.entity.CrewRole;
import RunningMachines.R2R.domain.crew.common.entity.CrewUser;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.crew.common.repository.CrewUserRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.s3.S3RequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class CrewCommandService {
    private final CrewRepository crewRepository;
    private final S3Provider s3Provider;
    private final AuthCommandService authCommandService;
    private final CrewUserRepository crewUserRepository;

    @Transactional
    public int createCrew(CrewCreateCommandDto crewCreateCommandDto) {
        // TODO - 관리자의 크루 생성 허용
        crewCreateCommandDto.validate();

        User currentUser = authCommandService.getCurrentUser();
        int passcode = generateRandomPasscode();

        String profileImageUrl = s3Provider.uploadFile(crewCreateCommandDto.getProfileImage(),
                S3RequestDto.builder()
                        .userId(currentUser.getId())
                        .dirName("크루_프로필")
                        .build()
        );

        // Crew 생성
        Crew crew = Crew.builder()
                .title(crewCreateCommandDto.getTitle())
                .passcode(passcode)
                .build();

        CrewProfileImage profileImage = CrewProfileImage.builder()
                .imageUrl(profileImageUrl)
                .build();

        crew.setImages(profileImage);
        crewRepository.save(crew);

        // 생성자 크루원 가입
        CrewUser crewUser = CrewUser.builder()
                .role(CrewRole.LEADER)
                .user(currentUser)
                .crew(crew)
                .build();
        crewUserRepository.save(crewUser);

        return crew.getPasscode();
    }

    private int generateRandomPasscode() {
        Random random = new Random();
        return 1000 + random.nextInt(9000);
    }
}


