document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelector('.option-buttons');
    const startGameButton = document.getElementById('start-game');
    const gameBoard = document.querySelector('.game-board');
    const cells = document.querySelectorAll('.cell');
    const congratulations = document.getElementById('congratulations');
    const winnerText = document.getElementById('winner');
    const closeCongratulations = document.getElementById('close-congratulations');
    const resetGameButton = document.getElementById('reset-game');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let isGameActive = false;
    let playAgainstComputer = false;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    optionButtons.addEventListener('click', (e) => {
        if (e.target.id === 'play-against-computer') {
            playAgainstComputer = true;
        } else if (e.target.id === 'play-against-player') {
            playAgainstComputer = false;
        }
        optionButtons.classList.add('hidden');
        startGameButton.classList.remove('hidden');
    });

    startGameButton.addEventListener('click', () => {
        startGameButton.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        isGameActive = true;
    });

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (isGameActive && !cell.textContent) {
                cell.textContent = currentPlayer;
                board[cell.dataset.index] = currentPlayer;
                if (checkWin()) {
                    endGame();
                } else if (board.every(cell => cell)) {
                    endGame(true);
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    if (playAgainstComputer && currentPlayer === 'O') {
                        computerMove();
                    }
                }
            }
        });
    });

    closeCongratulations.addEventListener('click', () => {
        congratulations.classList.add('hidden');
        resetGame();
    });

    resetGameButton.addEventListener('click', () => {
        congratulations.classList.add('hidden');
        resetGame();
    });

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    });

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function endGame(draw = false) {
        isGameActive = false;
        gameBoard.classList.add('hidden');
        congratulations.classList.remove('hidden');
        winnerText.textContent = draw ? "It's a draw!" : currentPlayer;
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameBoard.classList.remove('hidden');
        congratulations.classList.add('hidden');
        isGameActive = true;
    }

    function computerMove() {
        let availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        if (checkWin()) {
            endGame();
        } else if (board.every(cell => cell)) {
            endGame(true);
        } else {
            currentPlayer = 'X';
        }
    }
});
