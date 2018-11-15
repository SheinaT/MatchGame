var game = document.getElementById("game");
var firstCard = null;//havent turned over first card//
var secondCard=null;
var counter=0;
grid(4, 3);
function grid(arr1, arr2) {
    var cardArray = [];
    for (var i = 0; i < 12 / 2; i++) {
        cardArray.push(i);
        cardArray.push(i);
    }

    var shuffleCards = [];
    while (cardArray.length > 0) {
        var r = Math.floor(Math.random() * cardArray.length);
        shuffleCards.push(cardArray[r]);
        cardArray.splice(r, 1);///how many items to get rid of//
    }

    for (var i = 0; i < arr1; i++) {
        for (var j = 0; j < arr2; j++) {
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
        if(match>= 12/2){
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

function gameWinner(){
    document.getElementById("winner").style.visibility= "visible";
}









