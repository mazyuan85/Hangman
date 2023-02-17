const wordDB = ["paperhands", "shilling", "gm", "ded", "doge", "down bad", "to the moon", "wagmi", "kek", "vitalik buterin", "ethereum", "solana", "binance", "kucoin", "pepe", "twitter", "bored ape yacht club", "opensea"]
const game = {
    gameWon: false,
    wordsGuessed: 0,
    wordsNeededToWin: 10,
    wrongGuesses: 0,
}
const guessedAlphabets = [];

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const alphabetButtons = document.querySelectorAll(".alphabets")



function init() {
    reloadScreen();
    wordDBRandomiser();
    wordPicker();
    maskWordState();
}
init ();

// Render Functions

function renderAll() {
    renderGameWord();
}

function renderGameWord() {
    const gameWordDisplayed = document.getElementById("gameWord");
    gameWordDisplayed.innerText = wordState.join("");
}

// Game Functions
// alphabetButtons.forEach(button => {
//     button.addEventListener("click", test)
// });

function updateState(alphabet) {
    let guessedCorrect = false;
    for (let i = 0; i < wordChosen.length; i++) {
        if (wordChosen[i] === alphabet) {
            wordState[i] = alphabet;
            game.wordsGuessed++;
            guessedCorrect = true;
        }
    }
    if ((guessedCorrect !== true) && (guessedAlphabets.includes(alphabet) === false)) {
        guessedAlphabets.push(alphabet);
        game.wrongGuesses++;
    }

}

function wordDBRandomiser() {
    mapDB = wordDB.map(x => x);
    // Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(mapDB) {
        let currentIndex = mapDB.length;
        let randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random()* mapDB.length);
            currentIndex--;
            [mapDB[currentIndex], mapDB[randomIndex]] = [mapDB[randomIndex], mapDB[currentIndex]];
        }
        return mapDB;
    }
    let shuffledDB = shuffle(mapDB);
    shuffledResult = shuffledDB.slice(0, game.wordsNeededToWin);
    return shuffledResult;
}

function wordPicker() {
    const randomIndex = Math.floor(Math.random()* shuffledResult.length);
    wordChosen = shuffledResult[randomIndex];
    wordChosen = wordChosen.toUpperCase();
    shuffledResult.splice(randomIndex,1);
    return wordChosen;
}

function maskWordState() {
    // Source: https://www.tutorialspoint.com/javascript_regexp/javascript_regexp_brackets_anycase.htm
    const splitArray = wordChosen.split("");
    wordState = splitArray.map(letter => {
        if (letter.match(/[a-zA-Z]/)) {
            return "_";
        }
        else {
            return letter;
        }
    });
    return wordState;
}


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
function reloadScreen() {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";
}

function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameOverScreen.style.display = "none";
    renderAll();
}

// TO BE REMOVED?
function endGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
}
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", reloadScreen);

// STRIKE OUT THE ALPHABET
// const a = document.getElementById("a");
// a.style.textDecoration = "line-through";