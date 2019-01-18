// global variables
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var gameArray = [{name: "jokic", image: "assets/images/jokic.jpg"},{name: "melo", image: "assets/images/melo.jpg"}, {name: "english", image: "assets/images/english.jpg"},
{name: "lever", image: "assets/images/lever.jpg"}, {name: "moe", image: "assets/images/moe.jpg"}]


var generateRandom = Math.floor(Math.random() * gameArray.length);
var game = gameArray[generateRandom].name;
var gameImage = gameArray[generateRandom].image
var lettersLeft = game.length;
var answerArray = []; 
var hasStarted = false;  


function playGame() {
    hasStarted = true;
    generateRandom = Math.floor(Math.random() * gameArray.length);
    
    game = gameArray[generateRandom].name;
    gameImage = gameArray[generateRandom].image

    lettersLeft = game.length;

     answerArray = []; 

    for(var i = 0; i < game.length; i++) {
        if (game[i] === "+") {
            answerArray[i] = "&nbsp;"; 
        } else {
            answerArray[i] = "_";
        }
    }

    lettersLeft = game.length;
    guessesLeft = 9;
    showGuessesLeft()
    incorrectAtt = []; 
    showGuessesAtt()
    showCurrentWord();
    showImage();
}

var winNum = 0;
function correctGuessCheck(guess) {
    if(game.indexOf(guess.key) > -1) {
        correctGuess(guess);
    }else {
        incorrectGuess(guess);
    }
}

function correctGuess(guess) {
    if(answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        addCorrectLetter(guess);
    }
}
// adding counter needed here
function addCorrectLetter(guess) {
    for(var i = 0; i < game.length; i++) {
        if (guess.key === game[i]) {
            answerArray[i] = guess.key.toUpperCase();
            showCurrentWord();
            lettersLeft--;
            if (lettersLeft === 0) {
                winNum++;
                showWins();
                nextImage();
                addCorrect();
                showCurrentWord();
            }
        }
    }
}

var incorrectAtt = [];
var guessesLeft = 9;
var lossNum = 0;

function incorrectGuess(guess) {
    if(incorrectAtt.indexOf(guess.key.toUpperCase()) < 0) {
        addIncorrectLetter(guess);
    }
}

function addIncorrectLetter(guess) {
    incorrectAtt.push(guess.key.toUpperCase());
    showGuessesAtt();
    guessesLeft--;
    showGuessesLeft();
    if(guessesLeft === 0) {
        lossNum++;
        showLosses();
        nextImage();
        displayAnswer();
    }
}
// for using in html 

function showWins() {
    var showWins = document.querySelector("#showWins");
    showWins.textContent = winNum;
}
function showLosses() {
    var showLosses = document.querySelector("#showLosses");
    showLosses.textContent = lossNum;
}
function showGuessesAtt() {
    var showGuessesAtt = document.querySelector("#showGuessesAtt");
    showGuessesAtt.textContent = incorrectAtt.join(", ");
}

function showGuessesLeft() {
    var showGuessesLeft = document.querySelector("#showGuessesLeft");
    showGuessesLeft.textContent = guessesLeft;
}

function showCurrentWord() {
    var showCurrentWord = document.querySelector("#showCurrentWord");
    showCurrentWord.innerHTML = answerArray.join(" ");
}

function showImage() {
    var showPicture = document.querySelector("#showPicture");
    showPicture.src = gameImage;
}

function nextImage() {
    var showPicture = document.querySelector("#showPicture");
    hasStarted = false;
}
function addCorrect() {
    var showCurrentWord = document.querySelector("#showCurrentWord");
    showCurrentWord.classList.add('correct');
}



document.addEventListener("keyup", function(event){
  
    if(hasStarted) {
        letterCheck(event);
    } else {
        playGame();
    }
});

function letterCheck(guess) {
    if(alphabet.indexOf(guess.key) > -1) {
        correctGuessCheck(guess);
    }
}