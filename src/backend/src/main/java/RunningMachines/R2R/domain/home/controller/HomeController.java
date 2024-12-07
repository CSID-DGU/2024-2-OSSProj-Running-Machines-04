package RunningMachines.R2R.domain.home.controller;

import RunningMachines.R2R.domain.home.service.HomeService;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
    private final HomeService homeService;
    private final AuthCommandService authCommandService;

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getDailyUserRecords() {
        // 현재 로그인한 사용자 ID 가져오기
        Long userId = authCommandService.getCurrentUser().getId();
        // 일일 기록 데이터 가져오기
        Map<String, Object> response = homeService.getDailyUserRecord(userId);
        return ResponseEntity.ok(response);
    }

    /**
     * 주간 크루 기록 조회
     * @return 주간 거리 랭킹 및 페이스 랭킹
     */
    @GetMapping("/crews")
    public ResponseEntity<Map<String, Object>> getWeeklyCrewRecords() {
        // 주간 크루 기록 데이터 가져오기
        Map<String, Object> response = homeService.getWeeklyCrewRecords();
        return ResponseEntity.ok(response);
    }
}
