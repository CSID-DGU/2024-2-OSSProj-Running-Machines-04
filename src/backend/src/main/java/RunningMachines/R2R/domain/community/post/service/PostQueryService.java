package RunningMachines.R2R.domain.community.post.service;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.post.dto.PostShowDetailResponseDto;
import RunningMachines.R2R.domain.community.post.dto.PostShowSimpleResponseDto;
import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostQueryService {
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public PostShowDetailResponseDto getPostWithComments(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        return PostShowDetailResponseDto.fromPost(post);
    }

    @Transactional(readOnly = true)
    public List<PostShowSimpleResponseDto> getPostsByBoard(Board board) {
        List<Post> posts = postRepository.findByBoardOrderByCreatedAtDesc(board);
        return posts.stream()
                .map(PostShowSimpleResponseDto::fromPost)
                .collect(Collectors.toList());
    }

    public List<PostShowSimpleResponseDto> searchPostsByBoardAndKeyword(Board board, String keyword) {
        return postRepository.findPostsByBoardAndKeyword(board, keyword)
                .stream()
                .map(PostShowSimpleResponseDto::fromPost)
                .collect(Collectors.toList());
    }
}
