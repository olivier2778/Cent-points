let namePlayer1
let namePlayer2
const diceFaces = ['./images/dice0.png' , './images/dice1.png' , './images/dice2.png' , './images/dice3.png' , './images/dice4.png' , './images/dice5.png' , './images/dice6.png' ,  './images/dice_anim.gif']
const imgSound = ['./images/volOff.png' , './images/volOn.png']
let soundHold
let soundDice
let soundLoose
let soundVictory
let soundOn = false
let scorePlayers
let globalPlayer1
let globalPlayer2
let roundPlayer1
let roundPlayer2
let diceResult = 0
let playerNumberRandom = 0
let playerNumberStart
let winnerPlayer
const winScore = 10

// valide l'action des boutons de jeu ( play et hold ) et de l'intialisation de la partie et de l'affichage des regles du jeu
document.getElementById("buttonNewGame").onclick = gameInit
document.getElementById("buttonRules").onclick = rules
document.getElementById("buttonOneMoreGame").onclick = oneMoreGame
document.getElementById("buttonNoMoreGame").onclick = noMoreGame                     
document.getElementById("buttonPlay").onclick = diceRoll
document.getElementById("buttonHold").onclick = hold
document.getElementById("buttonSubmitNames").onclick = submitNames
document.getElementById("soundVolume").onclick = sound

function gameInit() {                                              // gameInit  initialise les valeurs au debut du jeu ( ou des manches )
    scorePlayers = [0, 0]
    namePlayer1 = 'Player 1'
    namePlayer2 = 'Player 2'
    initPlayers ()
    displayScores()
    opacityPlayer()
    inputNames()    
}

function oneMoreGame() {                                           // on continue la partie en comptant les manches
    initPlayers ()
    if (playerNumberRandom === 1) {
        playerNumberRandom = 2
    } else {
        playerNumberRandom = 1
    }
    playerNumberStart = playerNumberRandom
    displayScores()
    opacityPlayer()
}

function initPlayers () {
    globalPlayer1 = 0
    roundPlayer1 = 0
    diceResult = 0
    globalPlayer2 = 0
    roundPlayer2 = 0
}

function noMoreGame() {                                            // fin de la partie avec reinitialisation du compteur des manches
    scorePlayers = [0, 0]
    oneMoreGame()   
}

function displayScores() {
    document.getElementById("namePlayer1").textContent = namePlayer1
    document.getElementById("namePlayer2").textContent = namePlayer2
    document.getElementById("roundPlayer1").textContent = roundPlayer1
    document.getElementById("roundPlayer2").textContent = roundPlayer2
    document.getElementById("globalPlayer1").textContent = globalPlayer1
    document.getElementById("globalPlayer2").textContent = globalPlayer2
}

function displayDice() {                                          // affichage de la face du dé resultant du lancé 
     document.getElementById("imageDice").src = diceFaces[diceResult]       
}   

function NoDisplayDice() {                                         // pas d'affichage du dé
    document.getElementById("imageDice").src = diceFaces[0]  
}

function randomPlayerChoice() {                                    // choix aleatoire du joueur qui commence 
        playerNumberRandom = Math.floor(Math.random() * 2) + 1
        playerNumberStart = playerNumberRandom    
}

function opacityPlayer() {                                        // actualisation de l'affichage de la fenetre active ou non pour les joueurs 1 et 2
    if (playerNumberStart !== 1) {        
        document.getElementById("activePlayer1").classList.replace("activePlayerOn", "activePlayerOff")  // remplace la 1ere class CSS par la 2e
        document.getElementById("activePlayer2").classList.replace("activePlayerOff", "activePlayerOn")
    } else {
        document.getElementById("activePlayer1").classList.replace("activePlayerOff", "activePlayerOn")
        document.getElementById("activePlayer2").classList.replace("activePlayerOn", "activePlayerOff")
    }
}

function inputNames() {                                             // modale de saisie des noms
    InputNamePlayers = new bootstrap.Modal(document.getElementById("InputNamePlayers"))     
    InputNamePlayers.show()     
}

function submitNames () {                                           // validation de la saisie des noms
    namePlayer1 = document.getElementById("InputNamePlayer1").value
    namePlayer2 = document.getElementById("InputNamePlayer2").value   
    document.getElementById("namePlayer1").textContent = namePlayer1
    document.getElementById("namePlayer2").textContent = namePlayer2
    InputNamePlayers.hide()    
}

function diceRoll() {                                          // jeu en cours
    document.getElementById("imageDice").src = diceFaces[7]     // animation du dé avec un gif
    playDiceRoll()
    setTimeout(play , 700)                                  // et attente 0,7s avant d'afficher le resultat du lancé (function play) 
}

function play() {                                            // determine la valeur du lancé et l'affiche , et si le lancé est 1 passe le tour au joueur suivant 
    diceResult = Math.floor(Math.random() * 6) + 1                            
    if (playerNumberStart === 1 && diceResult !== 1) {
        roundPlayer1 = roundPlayer1 + diceResult
        document.getElementById("roundPlayer1").textContent = roundPlayer1      
    } else if (playerNumberStart === 1 && diceResult === 1) {        
        roundPlayer1 = 0
        document.getElementById("roundPlayer1").textContent = roundPlayer1
        playerNumberStart = 2
        opacityPlayer()             
        setTimeout(NoDisplayDice , 600)    // supprime l'affichage du lancé avec 1  apres 3s
        playSoundLoose()
    } else if (playerNumberStart !== 1 && diceResult !== 1) {
        roundPlayer2 = roundPlayer2 + diceResult
        document.getElementById("roundPlayer2").textContent = roundPlayer2
   } else {       
        roundPlayer2 = 0
        document.getElementById("roundPlayer2").textContent = roundPlayer2
        playerNumberStart = 1
        opacityPlayer() 
        setTimeout(NoDisplayDice , 600) 
        playSoundLoose()
    }
    document.getElementById("imageDice").src = diceFaces[diceResult]   // affiche le lancé   
}

function hold() {       // hold valide le score provisoire effectué et l'ajoute au score global et ensuite passe le tour au joueur suivant    
    NoDisplayDice()  // le dé n'est plus affiché       
    if (playerNumberStart === 1) {
        playSoundHold()
        globalPlayer1 = globalPlayer1 + roundPlayer1
        document.getElementById("globalPlayer1").textContent = globalPlayer1
        if (globalPlayer1 >= winScore) {
            winnerPlayer = namePlayer1            
            scorePlayers[0]++
            victory()
        }
        roundPlayer1 = 0
        document.getElementById("roundPlayer1").textContent = roundPlayer1
        playerNumberStart = 2
        opacityPlayer()        
    } else {
        playSoundHold()
        globalPlayer2 = globalPlayer2 + roundPlayer2
        document.getElementById("globalPlayer2").textContent = globalPlayer2
        if (globalPlayer2 >= winScore) {
            winnerPlayer = namePlayer2
            scorePlayers[1]++
            victory()
        }
        roundPlayer2 = 0
        document.getElementById("roundPlayer2").textContent = roundPlayer2
        playerNumberStart = 1
        opacityPlayer()        
    }                 
}

function rules() {
    rulesModal = new bootstrap.Modal(document.getElementById("rulesModal"))
    rulesModal.show()
}

function victory() {
    playSoundVictory()                                                        // affichage modale victoire avec gestion manches
    document.getElementById("winnerPlayer").textContent = `${winnerPlayer} a gagné cette manche !`
    document.getElementById("player1Scores").textContent = `score de ${namePlayer1} : ${scorePlayers[0]}`
    document.getElementById("player2Scores").textContent = `score de ${namePlayer2} : ${scorePlayers[1]}`
    victoryModal = new bootstrap.Modal(document.getElementById("victoryModal"))    
    victoryModal.show()
}

function sound () {
    if ( soundOn === true) {
        soundOn = false
        document.getElementById("soundVolume").src = imgSound[0]  
        document.getElementById("soundText").textContent = "Son Off"      
    } else {
        soundHold = new Audio('./sounds/hold.mp3')            
        soundOn = true
        playSoundHold()  
        document.getElementById("soundVolume").src = imgSound[1]  
        document.getElementById("soundText").textContent = "Son On"             
        soundDice = new Audio('./sounds/dice.mp3')
        soundLoose = new Audio('./sounds/loose.mp3')  
        soundVictory = new Audio('./sounds/victory.mp3')      
    }
}

function playDiceRoll() {    
    if ( soundOn === true) {
        soundDice.play()
    }
}

function playSoundHold() {    
    if ( soundOn === true) {
        soundHold.play()
    }
}

function playSoundLoose() {    
    if ( soundOn === true) {
        soundLoose.play()
    }
}

function playSoundVictory() {    
    if ( soundOn === true) {
        soundVictory.play()
    }
}


// lance la function gameInit et randomPlayerChoice au chargement de la page
randomPlayerChoice()
gameInit()













