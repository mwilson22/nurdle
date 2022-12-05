'use strict';

const yellowBackground = "rgb(200, 200, 35)"
const greenBackground = "rgb(48, 206, 114)"
const greyBackground = "rgb(50, 50, 50)"
const blackBackground = "rgb(0, 0, 0)"
const darkGreyBackground = "rgb(30, 30 ,30)"

const correctPlace = '0'
const wrongPlace = '1'
const wrongLetter = '2'

var currentWord;    // Word the user is trying to guess
var round = 1       // Which game round the player is on
var wordPos = 1     // Which letter is 'next'
var greenInterval;  // ID for interval timer


function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}


function initWord() {
    console.log("Fetching guess-check.");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/check_guess/", false);
    xhr.send("0init");
}


function checkGuess(guess) {
    console.log("Fetching guess-check.");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/check_guess/", true);
    xhr.onload = () => {
        updateDisplay(xhr.response);
    }
    xhr.send(guess);
}


// Find the game tile based on which round and which letter the player is on
function getTile(row, col) {
    var tile_class_name = 'r' + row.toString() + '-' + 'c' + col.toString();
    var tiles = document.getElementsByClassName(tile_class_name);

    return tiles[0];
}

function setTileColour(tile, colour) {
    tile.style.backgroundColor = colour;
}

function getButton(letter) {
    var button_id = 'btn' + letter;
    var button = document.getElementById(button_id);

    return button;
}

function getButtonColour(letter) {
    var button = getButton(letter);
    return button.style.backgroundColor;
}

function setButtonColour(letter, colour) {
    var button = getButton(letter);
    button.style.backgroundColor = colour;
}


// Show the result for this guess
function updateDisplay(data) {
    var tile;
    var col;
    var data_dict = JSON.parse(data);
    var pos = 1;

    currentWord = data_dict["current word"];

    // Word not in list
    if (!data_dict["is a word"]) {
        var modal = document.getElementById("notInListModal");
        modal.style.display = "block";

        round -= 1;
        wordPos = 5;
        return;
    }

    // Display the result for this guess
    greenInterval = setInterval(function () {
        tile = getTile(round - 1, pos);
        switch (data_dict["result"][pos - 1]) {
            case '0':
                col = greenBackground;
                setButtonColour(tile.textContent, col);
                break;
            case '1':
                col = yellowBackground;
                if (getButtonColour(tile.textContent) != greenBackground) {
                    setButtonColour(tile.textContent, col);
                }
                break;
            case '2':
                col = greyBackground;
                if (getButtonColour(tile.textContent) != greenBackground && getButtonColour(tile.textContent) != yellowBackground) {
                    setButtonColour(tile.textContent, col);
                }
                break;
            default:
                break;
        }
        setTileColour(tile, col);

        pos += 1;
        // We have displayed all the letters
        if (pos == 6) {
            clearInterval(greenInterval);

            // We have a winner :o)
            if (data_dict["correct"]) {
                setTimeout(function () {
                    var modal = document.getElementById("youWinModal");
                    modal.style.display = "block";
                }, 300);

                round = 7;  // End the game
            }
            else {
                // We have a loser :o(
                if (round == 7) {
                    alert("Bad luck! Word was " + currentWord)
                }
            }
        }
    }, 200, pos, round);
}


// Handle letter keypress
function handleKeyPress(e) {
    var tile = getTile(round, wordPos);

    if (wordPos < 5) {
        tile.textContent = e.value
        wordPos += 1;
    }
    else {
        if (tile.textContent == '') {
            tile.textContent = e.value
        }
    }
}
function input(e) {
    if (!isTouchDevice()) {
        handleKeyPress(e);
    }
}
function touch(e) {
    handleKeyPress(e);
}

// Handle delete key
function del() {
    var tile = getTile(round, wordPos);

    if (tile.textContent != '') {
        tile.textContent = '';
        return;
    }

    if (wordPos > 1) {
        wordPos -= 1;
        tile = getTile(round, wordPos);
        tile.textContent = '';
    }
}

// Handle enter key
function enter() {
    var guess = "";
    if (wordPos == 5 && getTile(round, wordPos).textContent != '') {
        for (let i = 1; i < 6; i++) {
            var tile = getTile(round, i);
            guess = guess + tile.textContent;
        }

        if (round == 1) {
            // Initialise a new word
            initWord()
        }

        round += 1;
        wordPos = 1;

        checkGuess(guess)
    }
}
function touchEnter() {
    if (!isTouchDevice()) {
        enter();
    }
}
function inputEnter() {
    enter();
}


// Handle keypresses
document.addEventListener('keydown', function (event) {
    // Trigger the button element with a click
    event.preventDefault();
    if (event.key == "Backspace") {
        del();
    }
    else {
        getButton(event.key.toUpperCase()).click();
    }
});