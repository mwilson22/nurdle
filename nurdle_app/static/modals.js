'use strict';

// Get the modals
var modalWin = document.getElementById("youWinModal");
var modalNotIn = document.getElementById("notInListModal");

// Get the <span> element that closes the modal
var spanNotIn = document.getElementsByClassName("closeNotIn")[0];
var spanWin = document.getElementsByClassName("closeWin")[0];


// When the user clicks on <span> (x), close the modal
spanNotIn.onclick = function () {
    modalNotIn.style.display = "none";
}
spanWin.onclick = function () {
    modalWin.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalNotIn) {
        modalNotIn.style.display = "none";
    }
    if (event.target == modalWin) {
        modalWin.style.display = "none";
    }
}