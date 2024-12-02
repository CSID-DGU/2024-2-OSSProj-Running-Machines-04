package RunningMachines.R2R.domain.course.dto;

import RunningMachines.R2R.domain.course.entity.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

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
    private Long storeCounts;
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
                .storeCounts(course.getStoreCounts())
                .trafficLightCounts(course.getTrafficLightCounts())
                .courseLiked(courseLiked)
                .build();
    }
}
