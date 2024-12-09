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
public class UserDistanceResponseDto {
    private LocalDate date;
    private Double totalDistance;

    public static UserDistanceResponseDto of(LocalDate date, Double totalDistance) {
        return UserDistanceResponseDto.builder()
                .date(date)
                .totalDistance(totalDistance)
                .build();
    }
}

