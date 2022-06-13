/*
//step one: create new element (div)
var newElement = document.createElement("div");

//step two: query existing parent element
var parentElement = document.querySelector("body");

//step 3: append the child element to the parent element
parentElement.appendChild(newElement);

newElement.innerHTML = ("Hi I'm new here");
newElement.classList.add("class");
*/

//for i in range(6)

var submitButton = document.querySelector('#submitButton');
var message = document.querySelector('#message');
var currentGuessDiv = document.querySelector('#currentGuess');

var gameOver = false;
var correctWord = '';
var currentGuess = '';
var guesses = [];
var ATTEMPTS = 6;
var LENGTH = 5;

var allowed = [];
var answers = [];

function saveState() {
    if (gameOver == false) {
        localStorage.setItem('correctWord', JSON.stringify(correctWord));
        localStorage.setItem('guesses', JSON.stringify(guesses));
        localStorage.setItem('gameOver', JSON.stringify(gameOver));
    }
}

function loadState() {
 
    correctWord = JSON.parse(localStorage.getItem('correctWord'));
    guesses = JSON.parse(localStorage.getItem('guesses'));
    gameOver = JSON.parse(localStorage.getItem('gameOver'));

    if (!guesses) {
        guesses = [];
    }
    if (gameOver == null) {
        gameOver = false;
    }
}

function refreshBoard () {
    var mainGrid = document.querySelector('#mainGrid');
    mainGrid.innerHTML = '';
    var correctLetters = '';
    var partialLetters = '';
    var guessedLetters = '';
    
    //creates rows
    for (var i = 0; i < ATTEMPTS; i+=1) {
        
        var row = document.createElement('div');
        var letters = correctWord.split('');
        mainGrid.appendChild(row);
        row.classList.add('row');

        //creates columns
        for (var t = 0; t < LENGTH; t+=1) {
            var tile = document.createElement('div');
            row.appendChild(tile);
            tile.classList.add('tile');         

            //colors tiles based on letter
            if (i < guesses.length) {
                tile.innerHTML = guesses[i][t];
                tile.classList.add('guessed');
                guessedLetters += tile.innerHTML;
                if (tile.innerHTML === correctWord[t]) {
                    tile.classList.add('correct');
                    index = letters.indexOf(tile.innerHTML);
                    correctLetters += correctWord[t];
                    letters.splice(index, 1, null);
                } else if (correctWord.includes(tile.innerHTML) && letters.includes(tile.innerHTML) && !correctAfter(tile.innerHTML, i, t)) {
                    tile.classList.add('partial');
                    index = letters.indexOf(tile.innerHTML);
                    partialLetters += tile.innerHTML;
                    letters.splice(index, 1, null);
                }
            }

            if (i == guesses.length) {
                if (currentGuess[t]) {
                    tile.innerHTML = currentGuess[t];
                    tile.style.borderColor = '#787c7e';
                }
            }
        }

        if (guesses[i] == correctWord) {
            gameEnd('won');
        } else if (guesses.length == 6) {
            gameEnd('lost');
        }
    }

    refreshKeyboard(correctLetters, partialLetters, guessedLetters);
    console.log("refresh keyboard ran");
}

function correctAfter(letter, i, t) {
    var instances = 0;
    for (j = t; j < 5; j += 1) {
        if (correctWord[j] == guesses[i][j] && guesses[i][j] == letter) {
            instances += 1
        }
    }

    if (instances) {
        console.log("Returned True");
        return true
    } else {
        console.log("Returned False");
        return false
    }
}

function refreshKeyboard (correctLetters, partialLetters, guessedLetters) {
    var keyboard = document.querySelector('#keyboard');
    var alphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'];
    keyboard.innerHTML = '';

    for (var i = 0; i < 3; i += 1) {
        var keyboardRow = document.createElement('div');
        keyboard.appendChild(keyboardRow);
        keyboardRow.classList.add('keyboardRow');

        if (i == 0) {
            var amount = 10;
        } else {
            var amount = 9;

        for (var t = 0; t < amount; t += 1) {
            var key = document.createElement('button');
            keyboardRow.appendChild(key);
            key.classList.add('key');
            key.innerHTML = alphabet[0].toUpperCase();
            if (correctLetters.includes(alphabet[0])) {
                key.classList.add('correct');
                key.style.color = 'white';
            } else if (partialLetters.includes(alphabet[0])) {
                key.classList.add('partial');
                key.style.color = 'white'
            } else if (guessedLetters.includes(alphabet[0])) {
                key.classList.add('guessed');
            }

            if (alphabet[0] == 'enter') {
                key.classList.add('enterKey');
            } else if (alphabet[0] == 'delete') {
                key.classList.add('deleteKey');
            } else {
                key.classList.add('letterKey');
            }

            alphabet.shift();
 
            key.onclick = function () {
                if (key.classList.contains('letterKey')) { /*If a letter key is pressed*/
                    currentGuess += key.innerHTML;
                } else if (key.classList.contains('deleteKey')) { /*If the delete key is pressed*/
                    checkInput(currentGuess.toLowerCase());
                } else { /*If the enter key is pressed*/
                    if (currentGuess.length > 1) {
                        currentGuess = currentGuess.slice(0, -1);
                   } else {
                       currentGuess = '';
                   }
                }
            
                console.log("current guess: " + currentGuess);
                console.log("Key clicked: " + key.innerHTML + "********");
                refreshBoard();
            };
        }
    }
}

function resetGame() {
    gameOver = false;
    correctWord = '';
    currentGuess = '';
    guesses = [];
}

function getWordOfTheMinute() {
    var dateString = moment().format('YYYYMMDDHHmm');
    var dateNumber = parseInt(dateString, 10);
    var word = answers[dateNumber % answers.length];
    console.log("Computed: " + word);
    return word
}

function fetchWordList() {
    //goes to url and grabs information from server (API) . when this eventually happens (function (response from API) {body})
    //1 : sends request to server
    fetch('https://api.jsonbin.io/b/629f9937402a5b38021f6b38').then(function (response) {
        //'I want jsondata' . postponed to eventually happen/Asynchronous (function that will eventually happen)
        //3: Runs once data is recieved
        response.json().then(function (data) {
            //4: Runs once data is recieved
            allowed = data.allowed.concat(data.answers);
            answers = data.answers;
            loadState();
            chooseNewWord();
        });   
    });
    //2 : runs other code while program is fetching data from server
}

function chooseNewWord () {
    var newWord = getWordOfTheMinute();
    if (!correctWord || correctWord != newWord) {
        resetGame();
        refreshBoard();
        correctWord = newWord;
    }
    console.log("Answer: " + correctWord)
    saveState();
}


function gameEnd(turnout) {
    var titleHeader = document.querySelector('h1');
    gameOver = true;
    if (turnout == 'won') {
        titleHeader.innerHTML = 'You Win!';
        titleHeader.classList.add('won');
    } else {
        titleHeader.innerHTML = 'You Lose!';
        titleHeader.classList.add('lost');
    }
}

function checkInput (guess) {
    console.log("guess length: " + guess.length + " guess allowed? " + allowed.includes(guess));
    if (guess.length == 5 && allowed.includes(guess)) {
        guesses.push(guess);
        message.innerHTML = '';
        currentGuess = '';
        refreshBoard();
        console.log('Guess list: ' + guesses);
    } else {
        message.innerHTML = 'Only REAL 5 letter words bro';
    }
    saveState();
}

document.onkeydown = function (event) {
    if (event.keyCode >= 65 && event.keyCode <=90 && currentGuess.length < 5 && gameOver == false) { /*Any Letter between A and Z && guess isn't full && game hasn't ended*/
        currentGuess += event.key.toUpperCase();
    } else if (event.keyCode == 13) { /*enter*/
        checkInput(currentGuess.toLowerCase());
    } else if (event.keyCode == 8) { /*backspace*/
    if (currentGuess.length > 1) {
             currentGuess = currentGuess.slice(0, -1);
        } else {
            currentGuess = '';
        }
    }

    console.log("keyCode: " + event.keyCode);
    console.log("current guess: " + currentGuess);

    refreshBoard();
    
};

fetchWordList();
loadState();
refreshBoard();