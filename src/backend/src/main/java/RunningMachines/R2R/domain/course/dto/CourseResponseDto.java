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
    private double distance;
    private List<String> tags;
    private String name;
    private boolean courseLiked;

    public static CourseResponseDto of(Course course, String courseUrl, String fileName, List<String> tags, boolean courseLiked) {
        return CourseResponseDto.builder()
                .courseId(course.getId())
                .fileName(fileName)
                .courseUrl(courseUrl)
                .distance(course.getDistance())
                .tags(tags)
                .name(course.getName())
                .courseLiked(courseLiked)
                .build();
    }
}
