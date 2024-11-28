package RunningMachines.R2R.domain.community.post.repository;

import RunningMachines.R2R.domain.community.board.entity.Board;
import RunningMachines.R2R.domain.community.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByBoard(Board board);

    @Query("SELECT p FROM Post p WHERE p.board = :board AND " +
            "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.content) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Post> findPostsByBoardAndKeyword(Board board, String keyword);
}
