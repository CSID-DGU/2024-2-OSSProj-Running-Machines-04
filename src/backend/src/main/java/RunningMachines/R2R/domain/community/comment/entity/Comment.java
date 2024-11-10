package RunningMachines.R2R.domain.community.comment.entity;

import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.user.entity.User;
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
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parentComment;  // 부모 댓글 (대댓글이 아닌 경우 null)

    @OneToMany(mappedBy = "parentComment")
    private List<Comment> replies = new ArrayList<>();  // 대댓글 리스트

    @OneToMany(mappedBy = "comment")
    private List<CommentLike> hearts = new ArrayList<>();

    public Comment(String content, Post post, User user, Comment parentComment) {
        this.content = content;
        this.post = post;
        this.user = user;
        this.parentComment = parentComment;
        if (parentComment != null) {
            parentComment.addReply(this);
        }
    }

    public void addReply(Comment reply) {
        this.replies.add(reply);
    }
}
