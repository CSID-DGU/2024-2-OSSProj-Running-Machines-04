package RunningMachines.R2R.domain.user.entity;

import RunningMachines.R2R.domain.community.entity.Comment;
import RunningMachines.R2R.domain.community.entity.CommentLike;
import RunningMachines.R2R.domain.community.entity.Post;
import RunningMachines.R2R.domain.course.entity.CourseLike;
import RunningMachines.R2R.domain.course.entity.Review;
import RunningMachines.R2R.domain.course.entity.UserCourse;
import RunningMachines.R2R.domain.crew.entity.CrewPost;
import RunningMachines.R2R.domain.crew.entity.CrewPostComment;
import RunningMachines.R2R.domain.crew.entity.CrewUser;
import RunningMachines.R2R.global.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String email;

    private String password;

    private String nickname;

    private String profileImage;

    @OneToOne(mappedBy = "user")
    private Prefer prefer;

    @OneToMany(mappedBy = "user")
    private List<CrewUser> crewUsers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<CrewPost> crewPosts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<CrewPostComment> crewPostComments = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<CommentLike> commentLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserCourse> userCourses = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<CourseLike> courseLikes = new ArrayList<>();

}
