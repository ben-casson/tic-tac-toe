const gameSquare0 = document.querySelector(".square0");
const gameSquare1 = document.querySelector(".square1");
const gameSquare2 = document.querySelector(".square2");
const gameSquare3 = document.querySelector(".square3");
const gameSquare4 = document.querySelector(".square4");
const gameSquare5 = document.querySelector(".square5");
const gameSquare6 = document.querySelector(".square6");
const gameSquare7 = document.querySelector(".square7");
const gameSquare8 = document.querySelector(".square8");

const gameSquares = document.querySelectorAll(".grid-btn");
const gameSquaresArray = [...gameSquares];
const gameGrid = document.querySelector(".game-grid");

const playBtn = document.querySelector(".play-btn");

const resetBtn = document.querySelector(".reset-btn");

let moveNumber = 1;

let displayCount = 0;

let gameIsActive = false;


const Game = () => {
    function play() {
        gameIsActive = true;
        moveNumber = 1;
        playBtn.style.display = "none";
        resetBtn.style.display = "block";
        gameGrid.classList.add("game-grid-active");
        const newGameboard = Gameboard();
        newGameboard.displayGamePiece();
        resetBtn.addEventListener("click", () => {
            newGameboard.reset(newGameboard.gameboardArray);
        });
    } 
    return {play};
}

const Gameboard = () => {
    const gameboardArray = [gameSquare0.innerHTML, gameSquare1.innerHTML, gameSquare2.innerHTML,
                            gameSquare3.innerHTML, gameSquare4.innerHTML, gameSquare5.innerHTML,
                            gameSquare6.innerHTML, gameSquare7.innerHTML, gameSquare8.innerHTML];
    displayGamePiece(gameboardArray);
    function reset(gameboardArray) {
        resetGame(gameboardArray);
    } 
    return {gameboardArray, displayGamePiece, reset};
}

function displayGamePiece(gameboardArray) {
    gameSquaresArray.forEach((square) => {
        square.addEventListener("click", () => {
            if (gameIsActive) {
                if (moveNumber % 2 !== 0 && square.innerHTML === "") {
                    square.innerHTML = "X";
                    moveNumber++;
                    displayCount++;
                    updateGameboardArray(square, gameboardArray);
                    checkForWin(gameboardArray);
                }
                else if (moveNumber % 2 === 0 && square.innerHTML === "") {
                    square.innerHTML = "O";
                    moveNumber++;
                    displayCount++;
                    updateGameboardArray(square, gameboardArray);
                    checkForWin(gameboardArray);
                }
            }
        }); 
    });
}

function updateGameboardArray(square, gameboardArray) {
    let index = gameSquaresArray.indexOf(square);
    gameboardArray[index] = square.innerHTML;
}

const player1NameInput = document.querySelector(".player1-input");
const player2NameInput = document.querySelector(".player2-input");

function checkForWin(gameboardArray) {
    if ((gameboardArray[0] === "X" && gameboardArray[1] === "X" && gameboardArray[2] === "X") ||
        (gameboardArray[3] === "X" && gameboardArray[4] === "X" && gameboardArray[5] === "X") ||
        (gameboardArray[6] === "X" && gameboardArray[7] === "X" && gameboardArray[8] === "X") ||
        (gameboardArray[0] === "X" && gameboardArray[3] === "X" && gameboardArray[6] === "X") ||
        (gameboardArray[1] === "X" && gameboardArray[4] === "X" && gameboardArray[7] === "X") ||
        (gameboardArray[2] === "X" && gameboardArray[5] === "X" && gameboardArray[8] === "X") ||
        (gameboardArray[0] === "X" && gameboardArray[4] === "X" && gameboardArray[8] === "X") ||
        (gameboardArray[2] === "X" && gameboardArray[4] === "X" && gameboardArray[6] === "X")) {
            alert((player1NameInput.value || "Player 1") + " wins!");
            resetGame(gameboardArray);
    }
    else if ((gameboardArray[0] === "O" && gameboardArray[1] === "O" && gameboardArray[2] === "O") ||
             (gameboardArray[3] === "O" && gameboardArray[4] === "O" && gameboardArray[5] === "O") ||
             (gameboardArray[6] === "O" && gameboardArray[7] === "O" && gameboardArray[8] === "O") ||
             (gameboardArray[0] === "O" && gameboardArray[3] === "O" && gameboardArray[6] === "O") ||
             (gameboardArray[1] === "O" && gameboardArray[4] === "O" && gameboardArray[7] === "O") ||
             (gameboardArray[2] === "O" && gameboardArray[5] === "O" && gameboardArray[8] === "O") ||
             (gameboardArray[0] === "O" && gameboardArray[4] === "O" && gameboardArray[8] === "O") ||
             (gameboardArray[2] === "O" && gameboardArray[4] === "O" && gameboardArray[6] === "O")) {
                alert((player2NameInput.value || "Player 2") + " wins!");
                resetGame(gameboardArray);
    } 
    if (displayCount === 9) {
        alert("It's a tie!");
        resetGame(gameboardArray);
    }
}

function resetGame(gameboardArray) {
    displayCount = 0;
    gameIsActive = false;
    resetBtn.style.display = "none";
    playBtn.style.display = "block";
    gameGrid.classList.remove("game-grid-active");
    gameSquaresArray.forEach((square) => {
        square.innerHTML = "";
    });
    for (let i = 0; i < gameboardArray.length; i++) {
        gameboardArray[i] = "";
    }
}


playBtn.addEventListener("click", () => {
    const newGame = Game();
    newGame.play();
});