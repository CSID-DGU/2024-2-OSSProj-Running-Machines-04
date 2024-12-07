package RunningMachines.R2R.domain.community.board.service;

import RunningMachines.R2R.domain.community.board.entity.Board;
import org.springframework.stereotype.Service;

@Service
public class BoardService {
    public Board getCurrentBoard(String boardName) {
        return Board.findByName(boardName);
    }
}
