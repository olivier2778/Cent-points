
let globalPlayer1
let globalPlayer2
let roundPlayer1
let roundPlayer2
let diceResult
let playerNumberStart

const maxNumberPlayers = 2

const maxScore = 100
const minScore = 0
const looseRound = 1

document.getElementById("buttonPlay").onclick = play
document.getElementById("buttonHold").onclick = hold
document.getElementById("buttonNewGame").onclick = init


// initilaise les valeurs au debut du jeu ou de la partie

function init() {

    globalPlayer1 = 0
    roundPlayer1 = 0

    diceResult = 0

    globalPlayer2 = 0
    roundPlayer2 = 0

    document.getElementById("roundPlayer1").textContent = roundPlayer1
    document.getElementById("roundPlayer2").textContent = roundPlayer2

    document.getElementById("globalPlayer1").textContent = globalPlayer1
    document.getElementById("globalPlayer2").textContent = globalPlayer2

    randomPlayerChoice()
    OpacityPlayer()

}


function randomPlayerChoice() {
    playerNumberStart = Math.floor(Math.random() * (2)) + 1
}


// determine la valeur du lancer et passe le tour si resultat du lancé est 1

function play() {

    diceResult = Math.floor(Math.random() * (6)) + 1

    document.getElementById("dice").textContent = diceResult

    if (playerNumberStart === 1 && diceResult !== 1) {        
        roundPlayer1 = roundPlayer1 + diceResult
        document.getElementById("roundPlayer1").textContent = roundPlayer1

    } else if (playerNumberStart === 1 && diceResult === 1) {        
        roundPlayer1 = 0
        document.getElementById("roundPlayer1").textContent = 0
        playerNumberStart = 2
        OpacityPlayer()        

    } else if (playerNumberStart !== 1 && diceResult !== 1) {        
        roundPlayer2 = roundPlayer2 + diceResult
        document.getElementById("roundPlayer2").textContent = roundPlayer2

    } else {        
        roundPlayer2 = 0
        document.getElementById("roundPlayer2").textContent = 0
        playerNumberStart = 1
        OpacityPlayer()        
    }
}


// valide le score provisoire effectué et l'ajoute au score global et ensuite passe le tour au joueur suivant

function hold() {

    if (playerNumberStart === 1) {        

        globalPlayer1 = globalPlayer1 + roundPlayer1
        document.getElementById("globalPlayer1").textContent = globalPlayer1

        roundPlayer1 = 0
        document.getElementById("roundPlayer1").textContent = 0

        playerNumberStart = 2
        OpacityPlayer()

    } else {        

        globalPlayer2 = globalPlayer2 + roundPlayer2
        document.getElementById("globalPlayer2").textContent = globalPlayer2

        roundPlayer2 = 0
        document.getElementById("roundPlayer2").textContent = 0

        playerNumberStart = 1
        OpacityPlayer()
    }    
}


function OpacityPlayer() {
    if (playerNumberStart !== 1 ) {
        document.getElementById("activePlayer1").style.opacity = "0.4";
        document.getElementById("activePlayer2").style.opacity = "1";
    } else {
        document.getElementById("activePlayer1").style.opacity = "1";
        document.getElementById("activePlayer2").style.opacity = "0.4";
    }    
  }


init()












