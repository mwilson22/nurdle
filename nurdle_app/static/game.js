'use strict';

const yellowBackground = "rgb(200, 200, 35)"
const greenBackground = "rgb(48, 206, 114)"
const greyBackground = "rgb(50, 50, 50)"
const blackBackground = "rgb(0, 0, 0)"
const darkGreyBackground = "rgb(30, 30 ,30)"

const correctPlace = '0'
const wrongPlace = '1'
const wrongLetter = '2'

// var socket = new WebSocket('ws://localhost:8000/ws/some_url/')

socket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    console.log(data);
    document.getElementById('app').innerText = data.message;

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


function getTile(row, col) {
    var tile_class_name = 'r' + row.toString() + '-' + 'c' + col.toString();
    var tiles = document.getElementsByClassName(tile_class_name);

    return tiles[0];
}

function getButton(letter) {
    var button_id = 'btn' + letter;
    var button = document.getElementById(button_id);

    return button;
}


function setTileColour(tile, colour) {
    tile.style.backgroundColor = colour;
}

function setButtonColour(letter, colour) {
    var button = getButton(letter);
    button.style.backgroundColor = colour;
}


var round = 1
var wordPos = 1


function updateDisplay(data) {
    var tile;
    var col;
    var data_dict = JSON.parse(data);

    if (!data_dict["is a word"]) {
        alert("Word is not in list");
        round -= 1;
        wordPos = 5;
        return;
    }

    for (let i = 1; i < 6; i++) {
        tile = getTile(round - 1, i);
        switch (data_dict["result"][i - 1]) {
            case '0':
                col = greenBackground;
                setButtonColour(tile.textContent, col);
                break;
            case '1':
                col = yellowBackground;
                setButtonColour(tile.textContent, col);
                break;
            case '2':
                col = greyBackground;
                setButtonColour(tile.textContent, greyBackground);
                break;
            default:
                break;
        }
        setTileColour(tile, col);
    }

    if (data_dict["correct"]) {
        alert("You win!");
        round = 6;  // End the game
    }
}


// Handle letter keypress
function input(e) {
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