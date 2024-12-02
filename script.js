const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const checkWinner = () => {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winCombinations.some(([a, b, c]) => gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer);
};

const handleClick = (index) => {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        statusElement.textContent = `${currentPlayer} wins! 🎉`;
    } else if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        statusElement.textContent = "It's a draw! 🤝";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `${currentPlayer}'s turn`;
    }
};

const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

restartButton.addEventListener('click', restartGame);
