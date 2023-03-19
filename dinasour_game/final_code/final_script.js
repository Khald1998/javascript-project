// Select HTML DOM Elements
const canvas = document.getElementById('canvas')
const scoreElement = document.getElementById("score")
const restartBtn = document.getElementById("restart")

let jumpAudio = new Audio("../assets/jump-sound.mp3")
let hitAudio = new Audio("../assets/hit-sound.mp3")
// variables 
let player
let cactus
let score = 0
let isGameOver = false

// Define Constants, player image width = 43, height = 47
const PLAYER_WIDTH = 43
const PLAYER_HEIGHT = 47
const CACTUS_WIDTH = 17
const CACTUS_HEIGHT = 35

// Cactus class to create cactus object
class Cactus {
  constructor(width, height, hitboxWidth, hitboxHeight) {
    this.width = width
    this.height = height
    this.hitboxWidth = hitboxWidth
    this.hitboxHeight = hitboxHeight
    this.element;   // DOM Element
  }
}

// Player class to create cactus object
class Player {
  constructor(width, height, hitboxWidth, hitboxHeight) {
    this.width = width
    this.height = height
    this.hitboxWidth = hitboxWidth
    this.hitboxHeight = hitboxHeight
    this.element;   // DOM Element
  }
}

// function to create Player DOM Element, add event listeners, and render it 
function renderPlayer(player) {
  // create DOM Element 
  player.element = document.createElement("div")
  // add width to playerDOM
  player.element.style.width = player.width + "px"
  // add height to playerDOM
  player.element.style.height = player.height + "px"

  player.element.setAttribute("id", "playerID");

  // add css class to player
  player.element.classList.add('player')
  // add event lister (this will ensure that player can jump after the first jump and not only once)
  player.element.addEventListener('animationend', function () {
    // remove css class to player
    player.element.classList.remove('player--jump')
  })
  // append playerDOM to canvas Element
  canvas.appendChild(player.element)
}

// function to create Cactus DOM Element, and render it 
function renderCactus(cactus) {
  cactus.element = document.createElement("div")
  cactus.element.style.width = cactus.width + "px"
  cactus.element.style.height = cactus.height + "px"
  cactus.element.classList.add('cactus', 'slide', 'cactus--inside')
  canvas.appendChild(cactus.element)
}

function spaceKeyEvent(event) {
  if (event.code === 'Space') {
    player.element.classList.add('player--jump')    // add css class to make jump animation
    jumpAudio.play()
  }
}

// game loop every 10ms 
function gameLoop() {
  // function to check game state, will run every 
  let intervalID = setInterval(function () {
    let playerRectangle = player.element.getBoundingClientRect()         // get size of elment and position relative to viewport
    let cactusRectangle = cactus.element.getBoundingClientRect()      // get size of elment and position relative to viewport
    let canvasRect = canvas.getBoundingClientRect()
    // collision detection 
    if (
      playerRectangle.x < cactusRectangle.x + cactus.hitboxWidth &&
      playerRectangle.x + player.hitboxWidth > cactusRectangle.x &&
      playerRectangle.y < cactusRectangle.y + cactus.hitboxHeight &&
      playerRectangle.y + player.hitboxHeight > cactusRectangle.y &&
      !isGameOver
    ) {
      hitAudio.play()
      isGameOver = true
      cactus.element.classList.add('pause')  // add css class to paus cactus animation
      clearInterval(intervalID)
      gameOver()
    }

    // check the oppposite of isGameOver 
    if (!isGameOver) {
      score++
      scoreDisplay = score
      scoreElement.textContent = "score:  " + scoreDisplay
    }
    // check if cactus outside canvas to hide then to dispaly it again
    if (cactusRectangle.x < canvasRect.x) {
      cactus.element.classList.remove('cactus--inside')
      cactus.element.classList.add('cactus--outside')
    } else {
      cactus.element.classList.remove('cactus--outside')
      cactus.element.classList.add('cactus--inside')
    }
  }, 10)
  return intervalID
}

// start, restart game function
function startGame() {
  // Spacebar key Event listner to make player jump
  document.addEventListener('keyup', spaceKeyEvent)
  restartBtn.classList.add('hide')
  // is game over
  player = new Player(PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH - 5, PLAYER_HEIGHT - 5)
  cactus = new Cactus(CACTUS_WIDTH, CACTUS_HEIGHT, CACTUS_WIDTH - 3, CACTUS_HEIGHT - 3)
  renderPlayer(player)
  renderCactus(cactus)
  intervalID = gameLoop()
}

function resetGame() {
  restartBtn.classList.add('hide')
  restartBtn.classList.remove('show')
  canvas.removeChild(canvas.lastChild)
  canvas.removeChild(canvas.lastChild)
  score = 0
  isGameOver = false
}

function gameOver() {
  restartBtn.classList.add('show')
  restartBtn.classList.remove('hide')
  document.removeEventListener('keyup', spaceKeyEvent)
}

restartBtn.addEventListener('click', function () {
  resetGame()
  startGame()
})

startGame()  