package RunningMachines.R2R.domain.user.service;

import RunningMachines.R2R.domain.course.entity.UserCourse;
import RunningMachines.R2R.domain.course.repository.UserCourseRepository;
import RunningMachines.R2R.domain.user.dto.UserDistanceDto;
import RunningMachines.R2R.domain.user.dto.UserInfoResponseDto;
import RunningMachines.R2R.domain.user.dto.UserRecentResponseDto;
import RunningMachines.R2R.domain.user.dto.UserStatsResponseDto;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MyPageQueryService {

    private final UserRepository userRepository;
    private final UserCourseRepository userCourseRepository;

    public UserInfoResponseDto getUserInfo(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return UserInfoResponseDto.from(user);
    }

    public List<UserDistanceDto> getUserDistance(String email, int year, int month) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        LocalDateTime startDateTime = start.atStartOfDay();
        LocalDateTime endDateTime = end.atTime(23, 59, 59);

        List<UserCourse> userCourses = userCourseRepository.findByUserIdAndDateRange(user.getId(), startDateTime, endDateTime);

        Map<LocalDate, Double> dailyDistanceMap = new HashMap<>();
        for (UserCourse userCourse : userCourses) {
            LocalDate date = userCourse.getCreatedAt().toLocalDate();
            dailyDistanceMap.put(date, dailyDistanceMap.getOrDefault(date, 0.0) + userCourse.getDistance());
        }

        List<UserDistanceDto> userDistanceDtos = new ArrayList<>();
        LocalDate currentDate = start;
        while (!currentDate.isAfter(end)) {
            Double totalDistance = dailyDistanceMap.getOrDefault(currentDate, 0.0);
            userDistanceDtos.add(UserDistanceDto.of(currentDate, totalDistance));
            currentDate = currentDate.plusDays(1);
        }
        return userDistanceDtos;
    }

    public List<UserRecentResponseDto> getUserRecentRunning(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        List<UserCourse> userCourses = userCourseRepository.findTop2ByUserIdOrderByCreatedAtDesc(user.getId());

        List<UserRecentResponseDto> responseDtos = new ArrayList<>();
        for (UserCourse userCourse : userCourses) {
            responseDtos.add(UserRecentResponseDto.of(userCourse));
        }

        return responseDtos;
    }

    public UserStatsResponseDto getUserStats(String email, String period) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDateTime = null;
        LocalDateTime endDateTime = null;

        if ("month".equals(period)) {
            startDateTime = now.withDayOfMonth(1).with(LocalTime.MIN);
            endDateTime = now.withDayOfMonth(now.toLocalDate().lengthOfMonth()).with(LocalTime.MAX);
        } else if ("week".equals(period)) {
            DayOfWeek currentDay = now.getDayOfWeek();
            startDateTime = now.minusDays(currentDay.getValue() - 1).with(LocalTime.MIN);
            endDateTime = now.plusDays(7 - currentDay.getValue()).with(LocalTime.MAX);
        }

        List<UserCourse> courses = userCourseRepository.findByUserIdAndDateRange(user.getId(), startDateTime, endDateTime);

        double distanceAvg = courses.stream()
                .mapToDouble(UserCourse::getDistance)
                .average()
                .orElse(0.0);

        double durationAvg = courses.stream()
                .mapToInt(UserCourse::getDuration)
                .average()
                .orElse(0.0);

        double paceAvg = courses.stream()
                .mapToDouble(UserCourse::getPace)
                .average()
                .orElse(0.0);

        distanceAvg = Math.round(distanceAvg * 100) / 100.0;
        durationAvg = (int) Math.round(durationAvg);
        paceAvg = Math.round(paceAvg * 100) / 100.0;

        return UserStatsResponseDto.builder()
                .distance(distanceAvg)
                .duration(durationAvg)
                .pace(paceAvg)
                .build();
    }
}
