const wordDB = ["paperhands", "shilling", "gm", "ded", "doge", "down bad", "to the moon", "wagmi", "kek", "vitalik buterin", "ethereum", "solana", "binance", "kucoin", "pepe", "twitter", "bored ape yacht club", "opensea", "bitcoin", "degen", "blockchain", "dao", "dyor", "defi", "fud", "gas", "hodl", "ledger", "satoshi nakamoto", "whale", "dolphin", "airdrop", "bag holder", "wen", "wen lambo", "memecoin", "pump and dump", "scalping", "seed phrase", "metamask", "phantom", "floor price", "delist", "pamp", "sweep", "ngmi", "ape", "nft", "cryptopunks", "moonbirds", "azuki", "doodles", "mutant ape yacht club", "otherside", "lfg", "rekt", "alpha", "mint", "ama", "raid", "town hall", "announcement", "flex", "collaboration", "poll", "meta", "cope", "hopium", "copium", "normie"];
const game = {
    gameWon: false,
    wordsGuessed: 0,
    wordsNeededToWin: 10,
    wrongGuesses: 0,
    guessedAlphabets: [],
    maxtries: 8,
};

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const alphabetButtons = document.querySelectorAll(".alphabets");

function init() {
    resetVariables();
    reloadScreen();
    clearClasses();
    wordDBRandomiser();
    wordPicker();
    maskWordState();
    renderAll();
};
init ();

// Render Functions

function renderAll() {
    renderGameWord();
    renderImages();
    renderWordsGuessed();
};

function renderImages() {
    const imageContainer = document.getElementById("gameImage");
    imageContainer.setAttribute("src",`assets/images/lvl${game.wrongGuesses}.png`);
};

function renderGameWord() {
    const gameWordDisplayed = document.getElementById("gameWord");
    gameWordDisplayed.innerText = wordState.join("");
};

function renderWordsGuessed () {
    const score = document.getElementById("score");
    score.innerHTML = `<h3>Your current score is: ${game.wordsGuessed}</h3>`;
};

// Game Functions
alphabetButtons.forEach(button => {
    button.addEventListener("click", handleClick);
    function handleClick(evt) {
        let alphabet = evt.target.textContent;
        updateState(alphabet, button);
        renderAll();
        checkWordCompletion();
        // checkWin();
        setTimeout(checkWin, 5000);
    }; 
});

function updateState(alphabet, button) {
    let guessedCorrect = false;
    for (let i = 0; i < wordChosen.length; i++) {
        if (wordChosen[i] === alphabet) {
            wordState[i] = alphabet;
            guessedCorrect = true;
            button.classList.add("rightLetter");

        };
    };
    if ((guessedCorrect !== true) && (game.guessedAlphabets.includes(alphabet) === false)) {
        game.guessedAlphabets.push(alphabet);
        game.wrongGuesses++;
        button.classList.add("wrongLetter");
    };

};

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
    };
    let shuffledDB = shuffle(mapDB);
    shuffledResult = shuffledDB.slice(0, game.wordsNeededToWin);
    return shuffledResult;
};

function wordPicker() {
    const randomIndex = Math.floor(Math.random()* shuffledResult.length);
    if (shuffledResult.length > 0) {
    wordChosen = shuffledResult[randomIndex];
    wordChosen = wordChosen.toUpperCase();
    shuffledResult.splice(randomIndex,1);
    return wordChosen;
    };
};

function maskWordState() {
    // Source: https://www.tutorialspoint.com/javascript_regexp/javascript_regexp_brackets_anycase.htm
    const splitArray = wordChosen.split("");
    wordState = splitArray.map(letter => {
        if (letter.match(/[a-zA-Z]/)) {
            return "_";
        }
        else {
            return letter;
        };
    });
    return wordState;
};

function checkWordCompletion() {
    if (wordState.join("") === wordChosen) {
        game.wordsGuessed ++;
        game.guessedAlphabets = [];
        clearClasses();
        wordPicker();
        maskWordState();
        renderAll();
    };
};

function clearClasses() {
    game.wrongGuesses = 0;
    const allAlphabets = document.querySelectorAll(".alphabets");
    allAlphabets.forEach(function(alphabet) {
        alphabet.classList.remove("wrongLetter", "rightLetter");
    });
};

function checkWin() {
    if (game.wordsGuessed === game.wordsNeededToWin) {
        game.gameWon = true;
        let gameWon = game.gameWon;
        gameOver(gameWon);
    } else if (game.wrongGuesses === game.maxtries) {
        gameOver();
    };
};

function gameOver(gameWon) {
    const gameOverHeader = document.getElementById("gameOverHeader");
    const gameOverImage = document.getElementById("gameOverImage");  
    if (gameWon) {
        gameOverHeader.innerHTML = "<h1>You Win!</h1>";
        gameOverImage.setAttribute("src", "assets/images/pepewin.gif");
        endGame();
    } else {
        gameOverHeader.innerHTML = "<h1>You Lose!</h1>";
        gameOverImage.setAttribute("src", "assets/images/pepelose.gif");
        endGame();
    };
};

// Auxiliary Transition Functions
function reloadScreen() {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";

 };

function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameOverScreen.style.display = "none";
};

function endGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
};

function resetVariables () {
    game.guessedAlphabets = [];
    game.wrongGuesses = 0;
    game.gameWon = false;
    game.wordsGuessed = 0;
};

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", init);

// to do: to add losing word to gameover screen