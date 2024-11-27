package RunningMachines.R2R.domain.course.controller;

import RunningMachines.R2R.domain.course.dto.CourseDetailResponseDto;
import RunningMachines.R2R.domain.course.dto.CourseResponseDto;
import RunningMachines.R2R.domain.course.service.CourseCommandService;
import RunningMachines.R2R.domain.course.service.CourseQueryService;
import RunningMachines.R2R.global.auth.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
@Tag(name = "Course", description = "코스 관련 API")
public class CourseController {

    private final CourseCommandService courseCommandService;
    private final CourseQueryService courseQueryService;

    @Operation(summary = "관리자 코스 등록")
    @PostMapping(value = "/uploadGpx", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> uploadMultipleGpxFiles(@RequestPart("files") List<MultipartFile> gpxs) {
        courseCommandService.uploadCourseGpx(gpxs);
        return ResponseEntity.ok("코스 등록 성공");
    }

    @Operation(summary = "추천 코스 목록 조회 (GPX url 반환)")
    @GetMapping("/recommend")
    public ResponseEntity<List<CourseResponseDto>> recommendCourse(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam double lat, @RequestParam double lon) {
        return ResponseEntity.ok(courseQueryService.getCourses(customUserDetails.getUsername(), lat, lon));
    }

    @Operation(summary = "추천 코스 목록 조회 (GPX 파싱)")
    @GetMapping("/recommendDetail")
    public ResponseEntity<List<CourseDetailResponseDto>> recommendCourseDetial(@RequestParam double lat, @RequestParam double lon) {
        return ResponseEntity.ok(courseQueryService.getCourseDetails(lat, lon));
    }

    @Operation(summary = "코스 즐겨찾기 버튼 (등록/취소)", description = "즐겨찾기 있다면 취소, 즐겨찾기 없다면 등록")
    @PostMapping("/{courseId}")
    public ResponseEntity<String> saveCurseLike(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long courseId) {
        return ResponseEntity.ok(courseCommandService.saveCourseLike(customUserDetails.getUsername(), courseId));
    }
}
