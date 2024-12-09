package RunningMachines.R2R.domain.course.dto;

import RunningMachines.R2R.domain.course.entity.Course;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class CourseResponseDto {
    private Long courseId;
    private String fileName;
    private String courseUrl;
    private String name;
    private String description;
    private double distance;
    private List<String> tags;
    private Long toiletCounts;
    private List<CoordinateDto> toiletLocation;
    private Long storeCounts;
    private List<CoordinateDto> storeLocation;
    private Long trafficLightCounts;
    private boolean courseLiked;

    public static CourseResponseDto of(Course course, List<String> tags, boolean courseLiked) {
        return CourseResponseDto.builder()
                .courseId(course.getId())
                .fileName(course.getFileName())
                .courseUrl(course.getCourseUrl())
                .name(course.getName().endsWith("\r") ? course.getName().replace("\r", "") : course.getName())
                .description(course.getDescription().endsWith("\r") ? course.getDescription().replace("\r", "") : course.getDescription())
                .distance(course.getDistance())
                .tags(tags)
                .toiletCounts(course.getToiletCounts())
                .toiletLocation(parseCoordinates(course.getToiletLocation()))
                .storeCounts(course.getStoreCounts())
                .storeLocation(parseCoordinates(course.getStoreLocation()))
                .trafficLightCounts(course.getTrafficLightCounts())
                .courseLiked(courseLiked)
                .build();
    }

    private static List<CoordinateDto> parseCoordinates(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, new TypeReference<List<CoordinateDto>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}

