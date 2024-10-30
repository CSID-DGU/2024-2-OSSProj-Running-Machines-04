package RunningMachines.R2R.global.auth;

import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // UserDetailsService의 loadUserByUsername 메소드를 오버라이드하여 재정의
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return createUserDetails(user); // CustomUserDetails로 반환
    }

    private UserDetails createUserDetails(User user) {
        return new CustomUserDetails(user); // CustomUserDetails 객체 생성 및 반환
    }
}
