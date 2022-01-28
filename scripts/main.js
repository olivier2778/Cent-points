let namePlayer1
let namePlayer2
const diceFaces = ['./images/dice0.png' , './images/dice1.png' , './images/dice2.png' , './images/dice3.png' , './images/dice4.png' , './images/dice5.png' , './images/dice6.png']
const imgSound = ['./images/volOff.png' , './images/volOn.png']
let soundHold
let soundDice
let soundLoose
let soundVictory
let soundOn = false   // sound off by default
let scorePlayers
let globalPlayer1
let globalPlayer2
let roundPlayer1
let roundPlayer2
let diceResult
let playerNumberRandom = 0
let InputNamePlayers
let playerNumberStart
let winnerPlayer
const winScore = 100  // score to reach for win

// validate the buttons actions
document.getElementById("buttonNewGame").onclick = gameInit
document.getElementById("buttonRules").onclick = rules
document.getElementById("buttonOneMoreGame").onclick = oneMoreGame
document.getElementById("buttonNoMoreGame").onclick = noMoreGame                     
document.getElementById("buttonPlay").onclick = diceRoll
document.getElementById("buttonHold").onclick = hold
document.getElementById("buttonSubmitNames").onclick = submitNames
document.getElementById("soundVolume").onclick = sound

function gameStart() {                                              // initialize the values at the start of the game (or rounds)
    scorePlayers = [0, 0]
    namePlayer1 = 'Player 1'
    namePlayer2 = 'Player 2'
    NoDisplayDice()    
    initPlayers ()
    displayPlayers()
    displayScores()
    opacityPlayer()    
}

function gameInit() {                                               // initializes values and allows to change players names                                  
    gameStart() 
    inputNames()
}

function oneMoreGame() {                                           // continue the game by counting the rounds
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

function noMoreGame() { 
    scorePlayers = [0, 0]                                           // end of the game with reset of the round counter
    oneMoreGame()   
}

function initPlayers () {
    globalPlayer1 = 0
    roundPlayer1 = 0   
    globalPlayer2 = 0
    roundPlayer2 = 0
}

function displayScores() {   
    document.getElementById("roundPlayer1").textContent = roundPlayer1
    document.getElementById("roundPlayer2").textContent = roundPlayer2
    document.getElementById("globalPlayer1").textContent = globalPlayer1
    document.getElementById("globalPlayer2").textContent = globalPlayer2
}

function displayPlayers() {
    document.getElementById("namePlayer1").textContent = namePlayer1
    document.getElementById("namePlayer2").textContent = namePlayer2
}
    
 let displayDice = () =>  document.getElementById("imageDice").src = diceFaces[diceResult]   // display of the face of the dice resulting from the throw
        
 let NoDisplayDice = () => document.getElementById("imageDice").style.visibility ='hidden'   // no dice display
    
function randomPlayerChoice() {                                    // random choice of starting player
        playerNumberRandom = Math.floor(Math.random() * 2) + 1
        playerNumberStart = playerNumberRandom    
}

function opacityPlayer() {                                        // updating display of the window active or not for players 1 and 2
    if (playerNumberStart !== 1) {        
        document.getElementById("activePlayer1").classList.replace("activePlayerOn", "activePlayerOff")  // replace the 1st CSS class with the 2nd
        document.getElementById("activePlayer2").classList.replace("activePlayerOff", "activePlayerOn")
    } else {
        document.getElementById("activePlayer1").classList.replace("activePlayerOff", "activePlayerOn")
        document.getElementById("activePlayer2").classList.replace("activePlayerOn", "activePlayerOff")
    }
}

function inputNames() {                                             // modal name entry mode
    InputNamePlayers = new bootstrap.Modal(document.getElementById("InputNamePlayers"))     
    InputNamePlayers.show()    
}

function submitNames () {                                            // name entry validation
    namePlayer1 = document.getElementById("InputNamePlayer1").value
    namePlayer2 = document.getElementById("InputNamePlayer2").value    
    if ( /^\S{3,10}$/.test(namePlayer1) &&  /^\S{3,10}$/.test(namePlayer2)) {         
        displayPlayers()        
        InputNamePlayers.hide()    
    } else {
        namePlayer1 = 'Player 1'
        namePlayer2 = 'Player 2'      
        alert("Les noms doivent contenir de 3 a 10 caractères sans espace")        
    }                          
}

function diceRoll() {                                               // game in progress, roll of the dice
    document.getElementById("imageDice").style.visibility ='visible'
    playSoundDiceRoll()    
    for ( let i = 1 ; i < 7 ; i++ )
    {
        setTimeout (function timer(){
            document.getElementById("imageDice").src = diceFaces[i]   // animation : display of each side of the dice after timeout
        }, i*150 )                                                                  
    } 
    setTimeout(play , 1050)                                         //  display of the face of the dice drawn after the end of the animation
}                          

function play() {                                                   // determines the value of the throw and displays it, and if the throw is 1 passes the turn 
     diceResult = Math.floor(Math.random() * 6) + 1                            
    if (playerNumberStart === 1 && diceResult !== 1) {
        roundPlayer1 = roundPlayer1 + diceResult
        document.getElementById("roundPlayer1").textContent = roundPlayer1      
    } else if (playerNumberStart === 1 && diceResult === 1) {        
        roundPlayer1 = 0
        document.getElementById("roundPlayer1").textContent = roundPlayer1
        playerNumberStart = 2
        opacityPlayer()             
        setTimeout(NoDisplayDice , 600)                          // suppress dice display after 0.6s for a throw with 1
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
    displayDice()   
}

function hold() {       // validates the provisional score and adds it to the global score and passes the turn to the next player
    if (playerNumberStart === 1) {        
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
    } else {        
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
    }
    setTimeout(NoDisplayDice , 200)     // the dice is no displayed after 0.2s   
    opacityPlayer()
    playSoundHold()                    
}

function rules() {
    let rulesModal = new bootstrap.Modal(document.getElementById("rulesModal"))
    rulesModal.show()
}

function victory() {                                                                 // Victory modal display with rounds management  
    playSoundVictory()                                                        
    document.getElementById("winnerPlayer").textContent = `${winnerPlayer} a gagné cette manche !`
    document.getElementById("player1Scores").textContent = `Score de ${namePlayer1} : ${scorePlayers[0]}`
    document.getElementById("player2Scores").textContent = `Score de ${namePlayer2} : ${scorePlayers[1]}`
    let victoryModal = new bootstrap.Modal(document.getElementById("victoryModal"))    
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

function playSoundDiceRoll() {    
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


// launch gameStart and randomPlayerChoice on page load
randomPlayerChoice()
gameStart()














