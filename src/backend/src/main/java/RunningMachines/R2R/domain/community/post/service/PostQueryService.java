package RunningMachines.R2R.domain.community.post.service;


import RunningMachines.R2R.domain.community.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostQueryService {
    private final PostRepository postRepository;
}
