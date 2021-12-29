
let namePlayer1 = "Player 1"
let namePlayer2 = "Player 2"
let scorePlayers
let globalPlayer1
let globalPlayer2
let roundPlayer1
let roundPlayer2
let diceResult
let playerNumberRandom = 0
let playerNumberStart
let winnerPlayer

const winScore = 10


// valide l'action des boutons de jeu ( play et hold ) ou de l'intialisation de la partie ou de l'ouverture de la modale f'affichage des regles du jeu
document.getElementById("buttonPlay").onclick = play
document.getElementById("buttonHold").onclick = hold
document.getElementById("buttonNewGame").onclick = gameInit
document.getElementById("buttonRules").onclick = rules
document.getElementById("buttonOneMoreGame").onclick = oneMoreGame
document.getElementById("buttonNoMoreGame").onclick = noMoreGame


// initialise les valeurs au debut du jeu ( ou de la partie par click )
function gameInit() {
    globalPlayer1 = 0
    roundPlayer1 = 0
    diceResult = 0
    globalPlayer2 = 0
    roundPlayer2 = 0
    scorePlayers = [0, 0]

    displayScores()
    opacityPlayer()
    inputNames()    
}

function oneMoreGame() {

    globalPlayer1 = 0
    roundPlayer1 = 0
    diceResult = 0
    globalPlayer2 = 0
    roundPlayer2 = 0    

    if (playerNumberRandom === 1) {
        playerNumberRandom = 2
    } else {
        playerNumberRandom = 1
    }

    playerNumberStart = playerNumberRandom

    displayScores()
    opacityPlayer() 
}

function noMoreGame() {    
    scorePlayers = [0, 0]
    oneMoreGame()   
}


function displayScores() {
    document.getElementById("roundPlayer1").textContent = roundPlayer1
    document.getElementById("roundPlayer2").textContent = roundPlayer2
    document.getElementById("diceResult").textContent = diceResult
    document.getElementById("globalPlayer1").textContent = globalPlayer1
    document.getElementById("globalPlayer2").textContent = globalPlayer2
}


function randomPlayerChoice() {
            playerNumberRandom = Math.floor(Math.random() * 2) + 1
        playerNumberStart = playerNumberRandom    
}


function opacityPlayer() {    // modif de l'affichage de la fenetre joueur 1 et 2
    if (playerNumberStart !== 1) {
        // remplace la 1ere class CSS  par la 2e
        document.getElementById("activePlayer1").classList.replace("activePlayerOn", "activePlayerOff")
        document.getElementById("activePlayer2").classList.replace("activePlayerOff", "activePlayerOn")
    } else {
        document.getElementById("activePlayer1").classList.replace("activePlayerOff", "activePlayerOn")
        document.getElementById("activePlayer2").classList.replace("activePlayerOn", "activePlayerOff")
    }
}


function inputNames() {
    NamesModal = new bootstrap.Modal(document.getElementById("InputNamePlayers"))
    NamesModal.show()
}


function play() {   // play determine la valeur du lancer et passe le tour au joueur suivant si resultat du lancé est 1  
    diceResult = Math.floor(Math.random() * 6) + 1
    document.getElementById("diceResult").textContent = diceResult

    if (playerNumberStart === 1 && diceResult !== 1) {
        roundPlayer1 = roundPlayer1 + diceResult
        document.getElementById("roundPlayer1").textContent = roundPlayer1

    } else if (playerNumberStart === 1 && diceResult === 1) {
        roundPlayer1 = 0
        document.getElementById("roundPlayer1").textContent = 0
        playerNumberStart = 2
        opacityPlayer()

    } else if (playerNumberStart !== 1 && diceResult !== 1) {
        roundPlayer2 = roundPlayer2 + diceResult
        document.getElementById("roundPlayer2").textContent = roundPlayer2

    } else {
        roundPlayer2 = 0
        document.getElementById("roundPlayer2").textContent = 0
        playerNumberStart = 1
        opacityPlayer()
    }
}

// valide le score provisoire effectué et l'ajoute au score global et ensuite passe le tour au joueur suivant

function hold() {
    if (playerNumberStart === 1) {
        globalPlayer1 = globalPlayer1 + roundPlayer1
        document.getElementById("globalPlayer1").textContent = globalPlayer1
        if (globalPlayer1 >= winScore) {
            winnerPlayer = namePlayer1
            scorePlayers[0]++
            victory()
        }
        roundPlayer1 = 0
        document.getElementById("roundPlayer1").textContent = 0
        playerNumberStart = 2
        opacityPlayer()

    } else {
        globalPlayer2 = globalPlayer2 + roundPlayer2
        document.getElementById("globalPlayer2").textContent = globalPlayer2
        if (globalPlayer2 >= winScore) {
            winnerPlayer = namePlayer2
            scorePlayers[1]++
            victory()
        }
        roundPlayer2 = 0
        document.getElementById("roundPlayer2").textContent = 0
        playerNumberStart = 1
        opacityPlayer()
    }
}


function rules() {
    rulesModal = new bootstrap.Modal(document.getElementById("rulesModal"))
    rulesModal.show()
}


function victory() {
    document.getElementById("winnerPlayer").textContent = winnerPlayer
    document.getElementById("scorePlayer1").textContent = scorePlayers[0]
    document.getElementById("scorePlayer2").textContent = scorePlayers[1]
    document.getElementById("namePlayer1").textContent = namePlayer1
    document.getElementById("namePlayer2").textContent = namePlayer2
    victoryModal = new bootstrap.Modal(document.getElementById("victoryModal"))
    victoryModal.show()
}

// lance la function gameInit et randomPlayerChoice au chargement de la page
randomPlayerChoice()
gameInit()













