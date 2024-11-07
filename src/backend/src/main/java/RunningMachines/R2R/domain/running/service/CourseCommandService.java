package RunningMachines.R2R.domain.running.service;

import RunningMachines.R2R.domain.running.entity.Course;
import RunningMachines.R2R.domain.running.repository.CourseRepository;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.s3.S3RequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseCommandService {

    private final S3Provider s3Provider;
    private final CourseRepository courseRepository;

    // S3에 러닝 코스를 넣는 메소드 (관리자용)
    public void uploadCourseGpx(List<MultipartFile> gpxs) {

        for (MultipartFile file : gpxs) {
            String gpxUrl = s3Provider.uploadFile(file, S3RequestDto.builder()
                    .userId(null) // 관리자 전용이기 때문에 userId 없음
                    .dirName("course")
                    .build());

            // Course 엔티티 생성
            Course course = Course.createCourse(gpxUrl);

            courseRepository.save(course);
        }
    }
}
