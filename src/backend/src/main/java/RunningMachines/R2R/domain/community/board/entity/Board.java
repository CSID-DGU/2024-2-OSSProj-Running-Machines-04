package RunningMachines.R2R.domain.community.board.entity;

import java.util.Arrays;

public enum Board {
    FREE, TOGETHER, SHOES, MARATHON;

    public static Board findByName(String name) {
        return Arrays.stream(Board.values())
                .filter(board -> board.name().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("해당 게시판이 존재하지 않습니다."));
    }
}
