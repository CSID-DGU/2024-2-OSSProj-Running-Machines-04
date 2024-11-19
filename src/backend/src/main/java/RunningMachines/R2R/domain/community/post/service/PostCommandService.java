package RunningMachines.R2R.domain.community.post.service;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.board.service.BoardService;
import RunningMachines.R2R.domain.community.post.dto.PostCreateRequestDto;
//import RunningMachines.R2R.domain.community.post.dto.PostShowDetailResponseDto;
//import RunningMachines.R2R.domain.community.post.dto.PostUpdateRequestDto;
import RunningMachines.R2R.domain.community.post.entity.Post;
import RunningMachines.R2R.domain.community.post.entity.PostImage;
import RunningMachines.R2R.domain.community.post.repository.PostRepository;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.service.AuthCommandService;
import RunningMachines.R2R.global.s3.S3Provider;
import RunningMachines.R2R.global.s3.S3RequestDto;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostCommandService {
    private final PostRepository postRepository;
    private final AuthCommandService authCommandService;
    private final BoardService boardService;
    private final S3Provider s3Provider;

    @Transactional
    public Long createPost(String boardNmae, PostCreateRequestDto postCreateRequestDto) {
        User currentUser = authCommandService.getCurrentUser();
        Board board = boardService.getCurrentBoard(boardNmae);
        Post post = postCreateRequestDto.toEntity(currentUser, board);

        // 최대 5장의 이미지를 S3에 업로드하고 URL을 저장
        if (postCreateRequestDto.getImages() != null && postCreateRequestDto.getImages().size() <= 5) {
            if (post.getPostImages() == null) {
                post.setPostImages(new ArrayList<>());
            }
            for (MultipartFile image : postCreateRequestDto.getImages()) {
                String imageUrl = s3Provider.uploadFile(image, S3RequestDto.builder()
                        .userId(currentUser.getId())
                        .dirName("posts")
                        .build());
                post.getPostImages().add(new PostImage(imageUrl, post));
            }
        }

        postRepository.save(post);
        log.info("게시글 저장 성공");
        return post.getId();
    }

    /*@Transactional
    public PostShowDetailResponseDto updatePost(PostUpdateRequestDto postUpdateRequestDto) {
        Post post = findPostById(postUpdateRequestDto.getPostId());
        validateWriter(post);
        post.update(postUpdateRequestDto.getTitle(), postUpdateRequestDto.getContent());
        postRepository.save(post);
        log.info("게시글 수정 완료");
    }*/

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