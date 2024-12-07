package RunningMachines.R2R.domain.home.service;

import RunningMachines.R2R.domain.course.entity.UserCourse;
import RunningMachines.R2R.domain.course.repository.UserCourseRepository;
import RunningMachines.R2R.domain.crew.common.entity.Crew;
import RunningMachines.R2R.domain.crew.common.entity.CrewUser;
import RunningMachines.R2R.domain.crew.common.repository.CrewRepository;
import RunningMachines.R2R.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoField;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeService {
    private final UserCourseRepository userCourseRepository;
    private final CrewRepository crewRepository;

    public Map<String, Object> getWeeklyCrewRecords() {
        // Define start and end of the current week
        LocalDateTime startOfWeek = LocalDate.now().with(ChronoField.DAY_OF_WEEK, 1).atStartOfDay();
        LocalDateTime endOfWeek = startOfWeek.plusDays(6).with(LocalTime.MAX);

        // Fetch all crews
        List<Crew> crews = crewRepository.findAll();

        // Calculate rankings for distance and pace
        List<Map<String, Object>> distanceRankings = new ArrayList<>();
        List<Map<String, Object>> paceRankings = new ArrayList<>();

        for (Crew crew : crews) {
            // Get all users in the crew
            List<User> crewUsers = crew.getCrewUsers().stream()
                    .map(cu -> cu.getUser())
                    .collect(Collectors.toList());

            // Calculate total distance and total duration
            double totalDistance = crewUsers.stream()
                    .flatMap(user -> userCourseRepository.findByUserIdAndDateRange(user.getId(), startOfWeek, endOfWeek).stream())
                    .mapToDouble(UserCourse::getDistance)
                    .sum();

            int totalDuration = crewUsers.stream()
                    .flatMap(user -> userCourseRepository.findByUserIdAndDateRange(user.getId(), startOfWeek, endOfWeek).stream())
                    .mapToInt(UserCourse::getDuration)
                    .sum();

            String averagePace = formatPace(totalDistance, totalDuration);

            // Add to distance ranking
            Map<String, Object> distanceRanking = new HashMap<>();
            distanceRanking.put("crewId", crew.getId());
            distanceRanking.put("title", crew.getTitle());
            distanceRanking.put("image", crew.getImages() != null ? crew.getImages().getImageUrl() : null);
            distanceRanking.put("distance", String.format("%.2fKM", totalDistance));
            distanceRankings.add(distanceRanking);

            // Add to pace ranking
            Map<String, Object> paceRanking = new HashMap<>();
            paceRanking.put("crewId", crew.getId());
            paceRanking.put("title", crew.getTitle());
            paceRanking.put("image", crew.getImages() != null ? crew.getImages().getImageUrl() : null);
            paceRanking.put("averagePace", averagePace);
            paceRankings.add(paceRanking);
        }

        // Sort rankings
        distanceRankings.sort(Comparator.comparing((Map<String, Object> m) -> Double.parseDouble(m.get("distance").toString().replace("KM", ""))).reversed());
        paceRankings.sort(Comparator.comparing((Map<String, Object> m) -> parsePaceToSeconds(m.get("averagePace").toString())));

        // Prepare the response
        Map<String, Object> response = new HashMap<>();
        response.put("distanceRankings", distanceRankings.stream().limit(3).collect(Collectors.toList()));
        response.put("paceRankings", paceRankings.stream().limit(3).collect(Collectors.toList()));

        return response;
    }

    public Map<String, Object> getDailyUserRecord(Long userId) {
        // Define start and end of the current day
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        // Fetch the user's daily records
        List<UserCourse> userCourses = userCourseRepository.findByUserIdAndDateRange(userId, startOfDay, endOfDay);

        // Calculate total distance, total duration, and average pace
        double totalDistance = userCourses.stream().mapToDouble(UserCourse::getDistance).sum();
        int totalDuration = userCourses.stream().mapToInt(UserCourse::getDuration).sum(); // duration in minutes
        String averagePace = formatPace(totalDistance, totalDuration);

        // Prepare the response
        Map<String, Object> response = new HashMap<>();
        response.put("totalDistance", String.format("%.2fKM", totalDistance));
        response.put("totalDuration", formatDuration(totalDuration));
        response.put("averagePace", averagePace);

        return response;
    }

    private String formatPace(double totalDistance, int totalDuration) {
        if (totalDistance <= 0) return "0'00''";
        int totalSeconds = (int) (totalDuration * 60 / totalDistance);
        int minutes = totalSeconds / 60;
        int seconds = totalSeconds % 60;
        return String.format("%d'%02d''", minutes, seconds);
    }

    private int parsePaceToSeconds(String pace) {
        String[] parts = pace.split("[']");
        int minutes = Integer.parseInt(parts[0]);
        int seconds = Integer.parseInt(parts[1].replace("''", ""));
        return minutes * 60 + seconds;
    }

    private String formatDuration(int totalMinutes) {
        int hours = totalMinutes / 60;
        int minutes = totalMinutes % 60;
        return String.format("%dh %02dm", hours, minutes);
    }
}

