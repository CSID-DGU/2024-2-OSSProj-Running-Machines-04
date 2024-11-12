package RunningMachines.R2R.domain.community.post.entity;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.comment.entity.Comment;
import RunningMachines.R2R.domain.user.entity.User;
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
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String title;

    private String content;

    @Enumerated(EnumType.STRING)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<PostImage> postImages;

    public void setPostImages(List<PostImage> postImages) {
        this.postImages = postImages;
    }

//    public void update(PostUpdateRequestDto postUpdateRequestDto) {
//        this.title = postUpdateRequestDto.getTitle();
//        this.content = postUpdateRequestDto.getContent();
//    }

}