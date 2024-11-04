package RunningMachines.R2R.domain.user.service;

import RunningMachines.R2R.domain.user.dto.UserResponseDto;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthQueryService {

    private final UserRepository userRepository;

    public UserResponseDto getUserInfo(String email) {
        return userRepository.findByEmail(email)
                .map(UserResponseDto::of)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
}

