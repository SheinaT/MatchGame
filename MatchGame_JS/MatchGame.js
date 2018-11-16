document.addEventListener("DOMContentLoaded", init);
var firstCard = null;//havent turned over first card//
var secondCard = null;
var counter = 0;

function init() {
    var buttons = document.querySelectorAll(".difficulty button");
    console.log("click working");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", setup);
    }
}

function setup(e) {
    var rows;///easy is not setting up///
    var columns;
    var difficulty = e.target.id; ///for each level of difficulty
    if (difficulty == "Easy") {
        rows = 3;
        rows = 4;
    }
    else if (difficulty == "Medium") {
        rows = 4;
        columns = 5;
    }
    else {
        rows = 4;
        columns = 6;
    }
    grid(rows, columns);
}

function grid(rows, columns) {
    var cardArray = [];
    for (var i = 0; i < (rows * columns) / 2; i++) {
        cardArray.push(i);
        cardArray.push(i);
    }

    var shuffleCards = [];
    while (cardArray.length > 0) {
        var r = Math.floor(Math.random() * cardArray.length);
        shuffleCards.push(cardArray[r]);
        cardArray.splice(r, 1);///how many items to get rid of//
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            createCard(shuffleCards.pop(), i, j);
            console.log("check");///remove///


        }

    }

}

function createCard(cardNum) {
    var card = document.createElement("img");
    card.num = cardNum;
    card.src = "Images/nickelodeon_logo.png";
    card.style.position = "relative";
    card.style.top = card.pageY - game.offsetTop + "px";
    card.style.left = card.pageX - game.offsetLeft + "px";
    card.onclick = cardClicked;
    game.appendChild(card);
}

function cardClicked(e) {
    var card = e.target;

    if (firstCard == null) {
        card.src = "Images/card" + card.num + ".jpg";
        firstCard = card;
        counter++;
        if (counter >= (rows * columns) / 2) {
            gameWinner();
        }
    } else if (secondCard == null) {
        card.src = "Images/card" + card.num + ".jpg";
        secondCard = card;
        setTimeout(checkIfMatch, 1000);
    }
}

function checkIfMatch() {
    if (firstCard.num == secondCard.num) {//num to get the value//
        game.removeChild(firstCard);
        game.removeChild(secondCard);

    } else {
        firstCard.src = "Images/nickelodeon_logo.png";
        secondCard.src = "Images/nickelodeon_logo.png";
    }

    firstCard = null;
    secondCard = null;
}

//function gameWinner() {
 //   document.getElementById("newGame").addEventListener("click", init);
 //   console.log("check");
//}















