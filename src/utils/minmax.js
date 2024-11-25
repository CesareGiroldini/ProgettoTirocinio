const checkWinner = (board) => {
    const winningCombinations = [
        [0, 1, 2], // prima riga
        [3, 4, 5], // seconda riga
        [6, 7, 8], // terza riga
        [0, 3, 6], // prima colonna
        [1, 4, 7], // seconda colonna
        [2, 5, 8], // terza colonna
        [0, 4, 8], // diagonale
        [2, 4, 6], // diagonale
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
};

const isBoardFull = (board) => {
    return board.every(cell => cell !== '');
};

const minmax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === 'X') return -10; // Giocatore
    if (winner === 'O') return 10; // CPU
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O'; // CPU
                let score = minmax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X'; // Giocatore
                let score = minmax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

export const findBestMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O'; // CPU
            let score = minmax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
};
