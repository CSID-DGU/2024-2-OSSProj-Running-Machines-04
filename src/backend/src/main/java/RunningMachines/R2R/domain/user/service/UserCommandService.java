package RunningMachines.R2R.domain.user.service;

import RunningMachines.R2R.domain.course.entity.Difficulty;
import RunningMachines.R2R.domain.user.dto.PreferRequestDto;
import RunningMachines.R2R.domain.user.dto.PreferResponseDto;
import RunningMachines.R2R.domain.user.entity.Prefer;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.PreferRepository;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserCommandService {

    private final PreferRepository preferRepository;
    private final UserRepository userRepository;

    public PreferResponseDto savePrefer(String email, PreferRequestDto preferRequestDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Prefer prefer = preferRequestDto.toEntity(user);
        Prefer savedPrefer = preferRepository.save(prefer);

        return PreferResponseDto.from(savedPrefer);
    }

    public void updatePreferElevation(Prefer prefer, Difficulty difficulty) {
        switch (difficulty) {
            case HIGH:
                prefer.decreaseElevation();
                break;
            case MEDIUM:
                break;
            case LOW:
                prefer.increaseElevation();
                break;
        }
    }
}
