var firstCard = null;//havent turned over first card//
var secondCard = null;
var incorrectGuesses=0;
var counter = 0;
var rows;
var columns;
$(document).ready(function(){
    init();

});

document.addEventListener("DOMContentLoaded", init);
function init() {
    window.addEventListener("resize", handleResize);
    document.getElementById("Start").addEventListener("click",overlayOff);
    function overlayOff(){
        document.getElementById("overlay").style.display= "none";
    }

    var buttons = document.querySelectorAll(".difficulty button");

    document.querySelector("#winner button").addEventListener("click", function () {
        document.getElementById("winner").className = "";

    });
    console.log("click working");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", setup);
    }
}

function setup(e) {
    incorrectGuesses=0;
    console.log(e.target);
    var difficulty = e.target.id; ///for each level of difficulty
    if (difficulty == "Easy") {
        rows = 3;
        columns = 4;
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
    firstCard = null;//for replay//
    secondCard = null; 
    counter = (rows * columns) / 2;
    document.getElementById("winner").className = "";
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
    document.getElementById("game").innerHTML = "";

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            createCard(shuffleCards.pop(), rows, columns);
            console.log("check");


        }
        game.appendChild(document.createElement("br"));//add break tag at end of each row-issue with this//
    }

}

function createCard(cardNum, rows, columns) {
    var card = document.createElement("img");
    card.num = cardNum;
    card.src = "Images/logo.jpg";
    card.style.maxWidth = 100 / columns + "%";//mention positioning in freetext
    card.style.maxHeight = 95 / rows + "vh";
    card.onclick = cardClicked;
    game.appendChild(card);
}


function handleResize(){
    document.querySelectorAll("#game img").forEach(function(img){
        img.style.maxWidth= 100/columns + "%";
        img.style.maxHeight=95/rows + "vh";
    });

}

function cardClicked(e) {
    var card = e.target;

    if (firstCard == null) {
        card.src = "Images/card" + card.num + ".jpg";
        firstCard = card;

    } else if (secondCard == null) {
        if(firstCard===card){
            return;
        }
        card.src = "Images/card" + card.num + ".jpg";
        secondCard = card;
        setTimeout(checkIfMatch, 1000);
    }
}

function checkIfMatch() {
    if (firstCard.num == secondCard.num) {//num to get the value//
        firstCard.className = "matched";
        secondCard.className = "matched";
        counter--;
        if (counter <= 0) {
            gameWinner();
        }

    } else {
        firstCard.src = "Images/logo.jpg";
        secondCard.src = "Images/logo.jpg";
        incorrectGuesses++;
    }

    firstCard = null;
    secondCard = null;
}

function gameWinner() {
    document.getElementById("overlay").style.display="block";
   document.querySelector(".modal-content").textContent="Winner! You had "+ incorrectGuesses + " incorrect guesses";
 
   






    console.log("check");
}
















