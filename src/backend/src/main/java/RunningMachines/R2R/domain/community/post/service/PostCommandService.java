package RunningMachines.R2R.domain.community.post.service;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.board.service.BoardService;
import RunningMachines.R2R.domain.community.post.dto.PostCreateRequestDto;
import RunningMachines.R2R.domain.community.post.dto.PostShowDetailResponseDto;
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

    @Transactional(readOnly = true)
    public PostShowDetailResponseDto getPostWithComments(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        return PostShowDetailResponseDto.fromPost(post);
    }
}
