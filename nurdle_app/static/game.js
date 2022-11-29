'use strict';

const yellowBackground = "rgb(239, 239, 35)"
const greenBackground = "rgb(48, 206, 114)"
const greyBackground = "rgb(50, 50, 50)"
const blackBackground = "rgb(0, 0, 0)"

var socket = new WebSocket('ws://localhost:8000/ws/some_url/')

socket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    console.log(data);
    document.getElementById('app').innerText = data.message;

}


function checkGuess(guess) {
    console.log("Fetching guess-check.");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/check_guess/", true);
    xhr.onload = () => {
        updateDisplay(xhr.response);
    };
    xhr.send(guess);
}

function updateDisplay(data) {
    alert(data);
}


var round = 1
var wordPos = 1

function get_tile(row, col) {
    var tile_class_name = 'r' + row.toString() + '-' + 'c' + col.toString();
    var tiles = document.getElementsByClassName(tile_class_name);

    return tiles[0];
}

// Handle letter keypress
function input(e) {
    var tile = get_tile(round, wordPos);

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
    var tile = get_tile(round, wordPos);

    if (tile.textContent != '') {
        tile.textContent = '';
        return;
    }

    if (wordPos > 1) {
        wordPos -= 1;
        tile = get_tile(round, wordPos);
        tile.textContent = '';
    }
}

// Handle enter key
function enter() {
    var guess = "";
    if (wordPos == 5 && get_tile(round, wordPos).textContent != '') {
        for (let i = 1; i < 6; i++) {
            var tile = get_tile(round, i);
            tile.style.backgroundColor = greyBackground;
            guess = guess + tile.textContent;
        }
        checkGuess(guess)
        if (round < 6) {
            round += 1;
            wordPos = 1;
        }
    }
}