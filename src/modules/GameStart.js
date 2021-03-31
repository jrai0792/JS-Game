import Phaser from "phaser";
// import start from "../assets/gamestart.jpeg"

class GameStart extends Phaser.Scene{

  constructor() {
    super({key: 'GameStart'});
  }
  preload() {
    this.load.image('background', '../src/assets/game-bg.jpeg');
    this.load.image('player', '../src/assets/player.png');
    this.load.image('bomb1', '../src/assets/bomb1.png');
    
  }

  create() {
    this.tileSprite = this.add.tileSprite(400, 300, 0, 0, 'background');
    this.add.image(400, 300, 0, 0, 'player');

  }
}

export default GameStart;