export const swap = (value) => {
    if (value === 1) {
        return 2;
    } else {
        return 1
    }
}

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export const isAllNull = (board) => {
    let boolean = true;
    board.forEach((el, i) => {
        if (el !== null) {
            boolean = false;
        }
    });
    return boolean;
}

export const minimax = (board, player) => {
    let scores = {
        1: 1,
        0: 0,
        2: -1
    };
    const mult = scores[player];
    let thisScore;
    let maxScore = -1;
    let bestMove = null;

    if (getWinner(board) !== null && getWinner(board) !== -1) {
        return [scores[getWinner(board)], 0];
    } else {
        for (let empty of getEmptySquares(board)) {
            let copy = board.slice();

            makeMove(empty, player, copy);
            thisScore = mult * minimax(copy, swap(player))[0];

            if (thisScore >= maxScore) {
                maxScore = thisScore;
                bestMove = empty;
            }
        }

        return [mult * maxScore, bestMove];
    }
};
export const makeMove = (index, player, board) => {
    board[index] = player;
};


export const getEmptySquares = (grid) => {
    let squares = [];
    grid.forEach((square, i) => {
        if (square === null) {
            squares.push(i);
        }
    });
    return squares;
};

export const getWinner = (grid) => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let winner = null;
    winningCombos.forEach((el, i) => {
        if (
            grid[el[0]] !== null &&
            grid[el[0]] === grid[el[1]] &&
            grid[el[0]] === grid[el[2]]
        ) {
            winner = grid[el[0]];
        } else if (winner === null && getEmptySquares(grid).length === 0) {
            winner = 0;
        }
    });
    return winner;
};
