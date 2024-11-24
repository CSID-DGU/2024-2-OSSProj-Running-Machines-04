package RunningMachines.R2R.domain.course.entity;

import RunningMachines.R2R.global.util.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Course extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String courseUrl;

    private String name; // LLM으로 받아오는 코스명

    private double distance;  // 거리

    private boolean isOfficial; // 관리자 등록 여부

    private String fileName; // gpx 원본 파일명

//    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
//    private List<Review> reviews = new ArrayList<>();

    public void setCourseUrl(String courseUrl) {
        this.courseUrl = courseUrl;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public static Course createCourse(String courseUrl, String fileName) {
        Course course = new Course();
        course.setCourseUrl(courseUrl);
        course.setFileName(fileName);
        return course;
    }
}
