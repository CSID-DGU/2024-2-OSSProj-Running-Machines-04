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

    private String fileName; // gpx 원본 파일명

    private double distance;  // 거리

    private String name; // LLM으로 받아오는 코스명

    private String description; // 코스 설명

    private Long toiletCounts; // 화장실 개수

    @Lob
    @Column(columnDefinition = "json")
    private String toiletLocation; // 화장실 위경도

    private Long storeCounts; // 편의점 개수

    @Lob
    @Column(columnDefinition = "json")
    private String storeLocation; // 편의점 위경도

    private Long trafficLightCounts; // 신호등 개수


//    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
//    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<CourseLike> courseLikes = new ArrayList<>();

    public void setCourseUrl(String courseUrl) {
        this.courseUrl = courseUrl;
    }

    public static Course createCourse(String courseUrl) {
        Course course = new Course();
        course.setCourseUrl(courseUrl);
        return course;
    }
}
