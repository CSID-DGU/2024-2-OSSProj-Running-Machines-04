package RunningMachines.R2R.domain.course.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class CourseResponseDto {
    private String fileName;
    private List<WaypointDto> waypoints;
    private double distance;
    private List<String> tags;
    private String name;
}
