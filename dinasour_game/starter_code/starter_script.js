/*              Select HTML DOM Elements            */

// Canvas

// Score Display Element

// Restart Button

/*              Audio Files                        */

// Audio Jump

// Audio hit(gameover)


/*              Define Constants                   */

// player image width
const PLAYER_WIDTH = 43
// player image height
const PLAYER_HEIGHT = 47
// cactus width
const CACTUS_WIDTH = 17
// cactus height
const CACTUS_HEIGHT = 35

/*              Classes                           */
// Cactus class to create cactus object
class Cactus {


}

// Player class to create cactus object
class Player {

}


/*              Functions                           */

// function to render Player DOM Element
function renderPlayer(player) {
  // create player DOM Element

  // set style width = player width

  // set style height = player height

  // set attribue id attribute

  // add css classes 

  // add event listeners for animation

  // append to canvas

}

// function to render Cactus DOM Element
function renderCactus(cactus) {
  // create player DOM Element

  // set style width = cactus width

  // set style height = cactus height

  // add css classes 

  // append to canvas
}

// add event listern to spacebar key(jump)
function spaceKeyEvent(event) {


}

// game loop every 10ms 
function gameLoop() {
  // setInterval to check game state

  // collision detection


  // check cactus outside canvas

  // check if game over
}

// start, restart game function
function startGame() {
  // add keyup event listener

  // hide restart button

  // intiate player

  // intiate cactus

}

function resetGame() {
  // hide restart button

  // remove cactus

  // remove player

  // reset score 

  // reset game over state

}

function gameOver() {
  // show restart button 

  // remove spacebar key event listener

}

restartBtn.addEventListener('click', function () {
  // call reset game 

  // call start game

})
