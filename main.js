
// voir si 2 niveau de jeu avec niveau 1 : + 100 points ou plus et niveau 2 avec le juste score de 100 points 

let globalPlayer1 = 0
let roundPlayer1 = 0
let resultPlayer1 = 0

let globalPlayer2 = 0
let roundPlayer2 = 0
let resultPlayer2 = 0

let numberPlayer = 1
const maxNumberPlayers = 2

const maxScore = 100
const minScore = 0
const looseRound = 1

document.getElementById("buttonPlay").onclick = play
document.getElementById("buttonHold").onclick = hold


// determine la valeur du lancer et passe le tour si resultat du lancé = 1

function play() {

    resultPlayer1 = Math.floor(Math.random() * (6 )) + 1

    document.getElementById("resultPlayer1").textContent = resultPlayer1

    if (resultPlayer1 !== 1) {
        roundPlayer1 = roundPlayer1 + resultPlayer1
        document.getElementById("roundPlayer1").textContent = roundPlayer1
        
    } else {
        roundPlayer1 = 0
        document.getElementById("roundPlayer1").textContent = 0
    }
}



function hold() {       

    globalPlayer1 = globalPlayer1 + roundPlayer1
    document.getElementById("globalPlayer1").textContent = globalPlayer1

    roundPlayer1 = 0
    document.getElementById("roundPlayer1").textContent = 0
}













