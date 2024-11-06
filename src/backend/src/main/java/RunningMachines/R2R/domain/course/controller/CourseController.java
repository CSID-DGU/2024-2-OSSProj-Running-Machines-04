package RunningMachines.R2R.domain.course.controller;

import RunningMachines.R2R.domain.course.service.CourseCommandService;
import RunningMachines.R2R.domain.user.dto.UserSignupRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseCommandService courseCommandService;

    @PostMapping(value = "/uploadGpx", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> uploadMultipleGpxFiles(@RequestParam("files") List<MultipartFile> gpxs) {

        courseCommandService.uploadCourseGpx(gpxs);

        return ResponseEntity.ok("코스 등록 성공");
    }
}

