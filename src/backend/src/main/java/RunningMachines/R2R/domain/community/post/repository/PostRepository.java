package RunningMachines.R2R.domain.community.post.repository;

import RunningMachines.R2R.domain.community.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
