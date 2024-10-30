package RunningMachines.R2R.global.auth;

import RunningMachines.R2R.domain.user.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private final User user;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(User user) {
        this.user = user;
        this.authorities = List.of(new SimpleGrantedAuthority("user"));
    }

    public CustomUserDetails(String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.user = new User(email, password);
        this.authorities = authorities;
    }

    // 권한 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    // 사용자 id(고유값) 반환
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    // 사용자 패스워드 반환
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // 계정 만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        return true; // 만료x
    }

    // 계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        return true; // 잠금x
    }

    // 패스워드 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 만료x
    }

    // 계정 사용 가능 여부 반환
    @Override
    public boolean isEnabled() {
        return true;
    }

}
