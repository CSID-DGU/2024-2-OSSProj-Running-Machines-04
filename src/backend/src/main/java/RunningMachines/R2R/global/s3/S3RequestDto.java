package RunningMachines.R2R.global.s3;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class S3RequestDto {
    private Long userId;
    private String dirName;
}
