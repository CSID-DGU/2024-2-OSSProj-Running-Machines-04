package RunningMachines.R2R.domain.running.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CourseResponseDto {
    private String fileName;
    private List<String> waypoints;
    private double distance;
    private List<String> tags;
}
