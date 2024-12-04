package RunningMachines.R2R.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDistanceDto {
    private LocalDate date;
    private Double totalDistance;

    public static UserDistanceDto of(LocalDate date, Double totalDistance) {
        return UserDistanceDto.builder()
                .date(date)
                .totalDistance(totalDistance)
                .build();
    }
}

