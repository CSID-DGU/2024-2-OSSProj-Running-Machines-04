package RunningMachines.R2R.global.auth;

import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@Slf4j
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth"; // 권한 정보 키 (JWT의 "auth" 필드에 권한 정보 저장)
    private static final String BEARER_TYPE = "Bearer"; // 토큰 타입을 나타내는 상수 (Bearer)
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // AccessToken의 유효시간 (30분)
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // RefreshToken의 유효시간 (7일)
    private static final long THREE_DAYS = 1000 * 60 * 60 * 24 * 3; // 토큰 만료 조건 설정용 (3일) -> 우효시간 3일 이하면 토큰 재발급

    private final Key key; // 토큰 생성 및 검증 위한 키

    public TokenProvider(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // base64로 인코딩된 secretKey를 디코딩해 byte 배열로 변환
        this.key = Keys.hmacShaKeyFor(keyBytes); // HMAC-SHA 알고리즘에 맞춰 키 생성
    }

    public TokenDto createAccessToken(Authentication authentication) {
        // 권한 정보 가져오기 (콤마로 구분된 문자열 반환)
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime(); // 현재 시간 계산

        // AccessToken 만료 시간 설정
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        // AccessToken 생성
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())       // payload "sub": 사용자정보(name)
                .claim(AUTHORITIES_KEY, authorities)        // payload "auth": 권한정보
                .setExpiration(accessTokenExpiresIn)        // payload "exp": 만료시간
                .signWith(key, SignatureAlgorithm.HS512)    // header "alg": "HS512"
                .compact();

        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
                .refreshToken(null)
                .build();
    }

    public TokenDto generateTokenDto(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();

        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())       // payload "sub": "name"
                .claim(AUTHORITIES_KEY, authorities)        // payload "auth": "USER"
                .setExpiration(accessTokenExpiresIn)        // payload "exp": 151621022 (ex)
                .signWith(key, SignatureAlgorithm.HS512)    // header "alg": "HS512"
                .compact();

        // RefreshToken 생성 (만료 시간만 설정)
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        // AccessToken의 Claims 객체 추출 (토큰 복호화)
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new CustomException(ErrorCode.INVALID_ACCESS_TOKEN);
        }

        // Claims에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // Claims에서 subject(사용자명)를 가져와 UserDetails 객체 생성
//        UserDetails principal = new CustomUserDetails(claims.getSubject(), "", authorities);
        CustomUserDetails principal = new CustomUserDetails(
                claims.getSubject(), // email
                "", // password는 필요 없으므로 공백으로 설정
                authorities // 권한 리스트
        );

        // Authentication 반환
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public boolean refreshTokenPeriodCheck(String token) {
        // 토큰에서 Claims 추출
        Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);

        // 현재, 만료 시간 계산
        long now = (new Date()).getTime();
        long refreshExpiredTime = claimsJws.getBody().getExpiration().getTime();

        // 유효기간 3일 이내면 true
        return (refreshExpiredTime - now <= THREE_DAYS);
    }

    private Claims parseClaims(String token) {
        try {
            // 토큰 파싱해 Claims 반환
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            // 만료 토큰이면, 예외에서 Claims 가져옴
            return e.getClaims();
        }
    }

}
