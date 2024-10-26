package RunningMachines.R2R.domain.community.entity;

import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.global.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletionException;

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

    @OneToMany(mappedBy = "parentComment", fetch = FetchType.LAZY)
    private List<Comment> replies = new ArrayList<>();  // 대댓글 리스트

    @OneToMany(mappedBy = "comment", fetch = FetchType.LAZY)
    private List<CommentLike> hearts = new ArrayList<>();

}
