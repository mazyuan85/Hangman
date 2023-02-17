const wordDB = ["gm", "kek", "vitalik buterin", "ethereum", "solana", "binance", "kucoin", "pepe", "twitter", "bored ape yacht club", "opensea"]
const game = {
    gameWon: false,
    wordsGuessed: 0,
}
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");



function init () {
    reloadGame();

}

init ();






function gameOver(gameWon) {
    const gameOverHeader = document.getElementById("gameOverHeader");
    const gameOverImage = document.getElementById("gameOverImage");

    
    if (gameWon) {
        gameOverHeader.innerHTML = "<h1>You Win!</h1>";
        gameOverImage.setAttribute("src", "assets/images/pepewin.gif");
        console.log("congrats");
    } else {
        gameOverHeader.innerHTML = "<h1>You Lose!</h1>";
        gameOverImage.setAttribute("src", "assets/images/pepelose.gif");
        console.log("sozbro");
    };
}

// Auxiliary Transition Functions
function reloadGame() {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";
}

function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameOverScreen.style.display = "none";
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", reloadGame);

// STRIKE OUT THE ALPHABET
// const a = document.getElementById("a");
// a.style.textDecoration = "line-through";