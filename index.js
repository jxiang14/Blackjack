let sum = 0
let cardEl = document.getElementById("card-el")
let sumEl = document.querySelector("#sum-el")
let messageEl = document.getElementById("message-el")
let message = ""
let active = false
let blackjack = false
const cardArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Jack", "Queen", "King", "Jack", "Queen", "King", "Jack", "Queen", "King", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Ace"]
const lastCards = []
let player = {
    name: "Jeffrey",
    chips: "$145"
}
let playerEl = document.getElementById("player-el")
let input = document.getElementById("name")

function startGame(){
    if (!active || blackjack){
        active = true
        for (let i = 0; i < lastCards.length; i++){
            cardArray.push(lastCards[i])
        }
        firstCard = getRandomCard();
        secondCard = getRandomCard();
        while(lastCards.length > 0){
            lastCards.pop();
        }
        lastCards.push(firstCard)
        lastCards.push(secondCard)
        let firstCardVal = findValue(firstCard)
        let secondCardVal = findValue(secondCard)
        sum = firstCardVal + secondCardVal
        newMessage();
        cardEl.textContent = "Cards: " + String(firstCard) + ", " + String(secondCard)
    }
}

function newCard(){
    if(active && !blackjack){
        newC = getRandomCard();
        lastCards.push(newC)
        let newCardVal = findValue(newC)
        sum += newCardVal
        newMessage();
        cardEl.textContent += ", " + newC
    }
}

function newMessage(){
    if (sum <= 20){
        message = "Do you want to draw a new card?"
        active = true
    }
    else if(sum == 21){
        message = "You got blackjack!"
        blackjack = true
    }
    else{
        message = "You lost!"
        active = false
    }
    sumEl.textContent = "Sum: " + String(sum)
    messageEl.textContent = message
}

function getRandomCard(){
    let firstRand = Math.floor(Math.random()*cardArray.length)
    let firstCard = cardArray[firstRand]
    cardArray.splice(firstRand,1)
    return firstCard
}

function findValue(firstCard){
    if (["Jack", "Queen", "King"].includes(firstCard)){
        firstCardVal = 10
    }
    else if(firstCard == "Ace"){
        firstCardVal = 11
    }
    else{
        firstCardVal = parseInt(firstCard)
    }
    return firstCardVal
}

function setName(){
    playerEl.textContent = input.value + ": " + player.chips
    input.value = ""
}