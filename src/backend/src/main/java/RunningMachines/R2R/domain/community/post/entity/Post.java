package RunningMachines.R2R.domain.community.post.entity;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.comment.entity.Comment;
import RunningMachines.R2R.domain.community.post.dto.PostUpdateRequestDto;
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
    @Column(length = 20)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostImage> postImages = new ArrayList<>();

    public void setPostImages(List<PostImage> postImages) {
        this.postImages = postImages;
    }

    public void updateTitle(String title) {
        if (title != null && !title.trim().isEmpty()) {
            this.title = title;
        }
    }

    public void updateContent(String content) {
        if (content != null && !content.trim().isEmpty()) {
            this.content = content;
        }
    }

    public void update(String title, String content) {
        if (title != null && !title.trim().isEmpty()) {
            this.title = title;
        }
        if (content != null && !content.trim().isEmpty()) {
            this.content = content;
        }
    }


    // 게시글 수정 - 새로운 이미지 추가
    public void addPostImage(PostImage postImage) {
        if (postImage == null) {
            throw new IllegalArgumentException("제거하려는 이미지가 null입니다.");
        }
        this.postImages.add(postImage);
    }

    // 게시글 수정 - 이미지 삭제
    public void removePostImage(PostImage postImage) {
        this.postImages.remove(postImage);
    }

}