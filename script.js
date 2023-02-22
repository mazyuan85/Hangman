/*----- Constants -----*/
const wordDB = ["paperhands", "shilling", "gm", "ded", "dogecoin", "down bad", "to the moon", "wagmi", "kek", "vitalik buterin", "ethereum", "solana", "binance", "kucoin", "pepe", "twitter", "bored ape yacht club", "opensea", "bitcoin", "degen", "blockchain", "dao", "dyor", "defi", "fud", "gas war", "hodl", "ledger", "satoshi nakamoto", "whale", "dolphin", "airdrop", "bag holder", "wen lambo", "memecoin", "pump and dump", "scalping", "seed phrase", "metamask", "phantom", "floor price", "delist", "pamp", "sweep", "ngmi", "ape into", "non-fungible token", "cryptopunks", "moonbirds", "azuki", "doodles", "mutant ape yacht club", "otherside", "lfg", "get rekt", "alpha", "mint", "ask me anything", "raid", "town hall", "announcement", "flex", "collaboration", "meta", "cope", "hopium", "copium", "normie", "fomo", "halving", "market cap", "private key", "bagholder", "diamond hands", "flippening", "rug pull", "shiba inu"];
const MAX_TRIES = 8;
const wordsNeededToWin = 10;

/*----- State Variables -----*/
const game = {
    gameWon: false,
    wordsGuessed: 0,
    wrongGuesses: 0,
    guessedAlphabets: [],
    wordCompletionTimer: 0,
    checkWinTimer: 0,
};

/*----- Cached Elements -----*/
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const alphabetButtons = document.querySelectorAll(".alphabets");
const gameOverWord = document.getElementById("gameOverWord");

// Game Start
function init() {
    resetVariables();
    reloadScreen();
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
        if (game.wrongGuesses < MAX_TRIES) {
            updateState(alphabet, button);
        }
        renderAll();
        clearTimeout(game.wordCompletionTimer);
        clearTimeout(game.checkWinTimer);
        game.wordCompletionTimer = setTimeout(checkWordCompletion, 1500);
        game.checkWinTimer = setTimeout(checkWin, 1500);
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
    shuffledResult = shuffledDB.slice(0, wordsNeededToWin);
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

function checkWin() {
    if (game.wordsGuessed === wordsNeededToWin) {
        game.gameWon = true;
        let gameWon = game.gameWon;
        gameOver(gameWon);
    } else if (game.wrongGuesses === MAX_TRIES) {
        gameOver();
    };
};

function gameOver(gameWon) {
    const gameOverHeader = document.getElementById("gameOverHeader");
    const gameOverImage = document.getElementById("gameOverImage");  
    if (gameWon) {
        gameOverHeader.innerHTML = "<h1>You Win!</h1>";
        gameOverImage.setAttribute("src", "assets/images/pepewin.gif");
    } else {
        gameOverHeader.innerHTML = "<h1>You Lose!</h1>";
        gameOverImage.setAttribute("src", "assets/images/pepelose.gif");
    };
    showGameOverWord();
    endScreen();
};

// Auxiliary Transition Functions
function reloadScreen() {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";

 };

function startingScreen() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameOverScreen.style.display = "none";
    renderAll();
};

function endScreen() {
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
};

function clearClasses() {
    game.wrongGuesses = 0;
    const allAlphabets = document.querySelectorAll(".alphabets");
    allAlphabets.forEach(function(alphabet) {
        alphabet.classList.remove("wrongLetter", "rightLetter");
    });
};

function resetVariables () {
    game.guessedAlphabets = [];
    game.wrongGuesses = 0;
    game.gameWon = false;
    game.wordsGuessed = 0;
    gameOverWord.innerHTML = "";
    clearClasses();
    wordDBRandomiser();
    wordPicker();
    maskWordState();
};

function showGameOverWord () {
    if (game.gameWon === true) {
        gameOverWord.innerHTML = `<h3>feels good man</h3>`;
    } else {
        gameOverWord.innerHTML = `<h3>The word was: ${wordChosen}</h3>`;
    }
};

startButton.addEventListener("click", startingScreen);
restartButton.addEventListener("click", init);