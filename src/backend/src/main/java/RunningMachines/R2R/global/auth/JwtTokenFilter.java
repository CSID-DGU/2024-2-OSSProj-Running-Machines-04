package RunningMachines.R2R.global.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    // HTTP 헤더에서 인증 토큰을 찾기 위한 헤더 키
    public static final String AUTHORIZATION_HEADER = "Authorization";
    // Bearer 토큰 타입을 나타내는 접두사
    public static final String BEARER_PREFIX = "Bearer ";

    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Request Header 에서 토큰 가져옴
        String jwt = resolveToken(request);

        // validateToken으로 토큰 유효성 검사
        // 유효한 토큰이면 해당 토큰으로 Authentication 객체 생성해 SecurityContext에 저장
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        // 다음 필터 체인으로 요청 및 응답 객체 전달
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        // Authorization 헤더에서 토큰 문자열 가져옴
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        // 가져온 문자열이 비어있지 않고, "Bearer "로 시작하는지 확인하고, "Bearer " 접두사 제거하고 토큰 부분만 반환
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.split(" ")[1].trim();
        }
        return null;
    }
}
