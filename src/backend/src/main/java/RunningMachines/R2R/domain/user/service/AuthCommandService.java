package RunningMachines.R2R.domain.user.service;

import RunningMachines.R2R.domain.user.dto.UserLoginRequestDto;
import RunningMachines.R2R.domain.user.dto.UserResponseDto;
import RunningMachines.R2R.domain.user.dto.UserSignupRequestDto;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.auth.*;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.s3.S3RequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthCommandService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final S3Provider s3Provider;

    public UserResponseDto signup(UserSignupRequestDto signupRequestDto, MultipartFile image) {
        if (userRepository.existsByEmail(signupRequestDto.getEmail())) {
            throw new CustomException(ErrorCode.USER_ALREADY_EXIST);
        }

        User user = signupRequestDto.toEntity(passwordEncoder.encode(signupRequestDto.getPassword()));
        user = userRepository.save(user);

        String imageUrl = null; // 프로필 사진 입력 안 했을 때 null로 저장할 수 있도록 함
        imageUrl = s3Provider.uploadFile(image, S3RequestDto.builder()
                .userId(user.getId())
                .dirName("profile")
                .build());

        user.setProfileImageUrl(imageUrl);
        return UserResponseDto.of(userRepository.save(user));
    }

    public TokenDto login(UserLoginRequestDto userLoginRequestDto) {
        // 이메일로 사용자 정보 로드
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userLoginRequestDto.getEmail());
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 비밀번호 확인
        if (!passwordEncoder.matches(userLoginRequestDto.getPassword(), user.getPassword())) {
            throw new CustomException(ErrorCode.USER_INVALID_PASSWORD);
        }

        // 로그인 정보를 기반으로 AuthenticationToken 생성
        // AuthenticationToken 객체는 로그인에서 입력 받은 정보를 가지고 있으며, 스프링 시큐리티 인증에 사용
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword());

        // authenticate로 실제 인증 과정 시작
        // authenticationManagerBuilder를 통해 생성된 AuthenticationManager가 CustomUserDetailsService의 loadUserByUsername 메서드 호출해 사용자 정보 검증
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // RefreshToken 저장
        user.updateRefreshToken(tokenDto.getRefreshToken());
        userRepository.save(user);

        // 토큰 발급
        return tokenDto;
    }

    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // Access Token 에서 user 정보 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 저장소의 정보를 기반으로 RefreshToken 값 가져옴
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // Refresh Token 일치하는지 검사
        if (!user.getRefreshToken().equals(tokenRequestDto.getRefreshToken())) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 새로운 AccessToken 생성
        TokenDto tokenDto;
        if (tokenProvider.refreshTokenPeriodCheck(user.getRefreshToken())) {
            // RefreshToken의 유효기간이 3일 이하면, Access,Refresh Token 모두 재발급
            tokenDto = tokenProvider.generateTokenDto(authentication);

            user.updateRefreshToken(tokenDto.getRefreshToken()); // 새로운 RefreshToken 저장
            userRepository.save(user);
        } else {
            // Refresh Token의 유효기간이 3일 이상이면, AccessToken만 재발급
            tokenDto = tokenProvider.createAccessToken(authentication);
        }

        // 토큰 발급
        return tokenDto;
    }
}
