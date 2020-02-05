/* global Phaser */
;(function() {
  // create a new scene
  const gameScene = new Phaser.Scene('Game')

  // load assets
  gameScene.preload = function() {
    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/player.png')
    console.log('Preload', this) // this == Scene
  }

  // called once after the preload ends
  gameScene.create = function() {
    const bg = this.add.sprite(0, 0, 'background')
    bg.setOrigin(0, 0) // change the origin to the top-left corner
    // bg.setPosition(640 / 2, 360 / 2)
    const gameW = this.sys.game.config.width
    const gameH = this.sys.game.config.height
    console.log('Game viewport', gameW, gameH, bg, this)

    const player = this.add.sprite(50, 180, 'player')
    player.depth = 1 // like css z-index
  }

  // set the configuration of the tame
  const config = {
    type: Phaser.AUTO, // WebGL, if it is possible
    width: 640,
    height: 630,
    scene: gameScene
  }

  // create a new game, pass the configuration
  const game = new Phaser.Game(config)

  // init() -> preload() -> create() -> update()
  console.log('Game started', game)
})()
