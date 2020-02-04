;(function() {
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  const screenWidth = 1000
  const screenHeight = 500
  const width = 50
  const height = 50

  let isGameLive = true

  class GameCharacter {
    /**
     * Game object
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color
     * @param {number} speed
     */
    constructor(x, y, width, height, color, speed) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.color = color
      this.speed = speed
      this.maxSpeed = 4
    }
    moveVertically() {
      if (this.y > screenHeight - 100 || this.y < 50) {
        this.speed = -this.speed
      }
      this.y += this.speed
    }
    moveHorizontally() {
      if (this.x > screenWidth - 100 || this.x < 50) {
        this.speed = -this.speed
      }
      this.x += this.speed
    }
  }

  const enemies = [
    new GameCharacter(200, 225, width, height, 'rgb(0, 0, 255)', 2),
    new GameCharacter(
      450,
      screenHeight - 100,
      width,
      height,
      'rgb(0, 0, 255)',
      3
    ),
    new GameCharacter(700, 50, width, height, 'rgb(0, 0, 255)', 4)
  ]

  const player = new GameCharacter(
    50,
    225,
    width,
    height,
    'rgb(0, 255, 255)',
    0
  )

  const goal = new GameCharacter(
    screenWidth - width * 2,
    230,
    width,
    100,
    'rgb(0, 0, 0)',
    0
  )

  const sprites = {}

  const loadSprites = () => {
    sprites.background = new Image()
    sprites.background.src = 'images/floor.png'
    sprites.player = new Image()
    sprites.player.src = 'images/hero.png'
    sprites.goal = new Image()
    sprites.goal.src = 'images/chest.png'
    sprites.enemy = new Image()
    sprites.enemy.src = 'images/enemy.png'
  }

  document.onkeydown = e => {
    const keyPressed = e.keyCode
    if (keyPressed === 39) {
      player.speed = player.maxSpeed // right
    } else if (keyPressed === 37) {
      player.speed = -player.maxSpeed // left
    }
  }

  document.onkeyup = () => {
    player.speed = 0
  }

  const checkCollisions = (rect1, rect2) => {
    const xOverlap =
      Math.abs(rect1.x - rect2.x) <=
      Math.max(rect1.width - 10, rect2.width - 10)
    const yOverlap =
      Math.abs(rect1.y - rect2.y) <=
      Math.max(rect1.height - 10, rect2.height - 10)

    return xOverlap && yOverlap
  }

  const draw = () => {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
    ctx.drawImage(sprites.background, 0, 0)
    ctx.drawImage(sprites.player, player.x, player.y)
    ctx.drawImage(sprites.goal, goal.x, goal.y)
    enemies.forEach(enemy => {
      ctx.drawImage(sprites.enemy, enemy.x, enemy.y)
    })
  }

  const update = () => {
    if (checkCollisions(player, goal)) {
      endGameLogic('You win!')
    }

    player.moveHorizontally()

    enemies.forEach(enemy => {
      if (checkCollisions(player, enemy)) {
        endGameLogic('Game over!')
      }
      enemy.moveVertically()
    })
  }

  const endGameLogic = text => {
    isGameLive = false
    alert(text)
    window.location = ''
  }

  const step = () => {
    update()
    draw()
    if (isGameLive) {
      requestAnimationFrame(step)
    }
  }

  loadSprites()
  step()
})()
