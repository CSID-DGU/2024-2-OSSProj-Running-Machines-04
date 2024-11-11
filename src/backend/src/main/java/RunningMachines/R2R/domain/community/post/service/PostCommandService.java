package RunningMachines.R2R.domain.community.post.service;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.board.service.BoardService;
import RunningMachines.R2R.domain.community.post.dto.PostCreateRequestDto;
import RunningMachines.R2R.domain.community.post.dto.PostShowDetailResponseDto;
import RunningMachines.R2R.domain.community.post.dto.PostUpdateRequestDto;
import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.repository.PostRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostCommandService {
    private final PostRepository postRepository;
    private final AuthCommandService authCommandService;
    private final BoardService boardService;

    @Transactional
    public Long createPost(String boardNmae, PostCreateRequestDto postCreateRequestDto) {
        User currentUser = authCommandService.getCurrentUser();
        Board board = boardService.getCurrentBoard(boardNmae);
        Post post = postCreateRequestDto.toEntity(currentUser, board);
        postRepository.save(post);
        log.info("게시글 저장 성공");
        return post.getId();
    }

    @Transactional
    public PostShowDetailResponseDto updatePost(Long postId, PostUpdateRequestDto postUpdateRequestDto) {
        Post post = findPostById(postId);
        validateWriter(post);
        post.update(postUpdateRequestDto.getTitle(), postUpdateRequestDto.getContent());
        log.info("게시글 수정 성공");
        return PostShowDetailResponseDto.fromPost(post);
    }

    private Post findPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
    }

    private void validateWriter(Post post) {
        User currentUser = authCommandService.getCurrentUser();
        if (!post.getUser().equals(currentUser)) {
            throw new IllegalStateException("작성자만 게시글을 수정할 수 있습니다.");
        }
    }

}
