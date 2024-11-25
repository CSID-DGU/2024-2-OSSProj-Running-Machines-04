package RunningMachines.R2R.domain.community.post.dto;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.comment.dto.CommentResponseDto;
import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.entity.PostImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
public class PostShowDetailResponseDto {
    private String title;
    private String writer;
    private String content;
    private LocalDateTime createdAt;
    private Board board;
    List<CommentResponseDto> comments;
    private List<String> postImages;
    private List<Long> postImageIds;

    public static PostShowDetailResponseDto fromPost(Post post) {
        return PostShowDetailResponseDto.builder()
                .title(post.getTitle())
                .writer(post.getUser().getNickname())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .board(post.getBoard())
                .comments(post.getComments().stream()
                        .filter(comment -> comment.getParentComment() == null)
                        .map(CommentResponseDto::from)
                        .collect(Collectors.toList()))
                .postImages(post.getPostImages()!=null ?
                        post.getPostImages().stream()
                                .map(PostImage::getImageUrl)
                                .collect(Collectors.toList()) : new ArrayList<>())
                .postImageIds(post.getPostImages() != null
                        ? post.getPostImages().stream()
                        .map(PostImage::getId)
                        .collect(Collectors.toList())
                        : new ArrayList<>())
                .build();
    }
}
