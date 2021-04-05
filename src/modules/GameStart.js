import Phaser from "phaser";
// import start from "../assets/gamestart.jpeg"

class GameStart extends Phaser.Scene{

  constructor() {
    super({key: 'GameStart'});
  }
  preload() {
    this.load.image('background', '../src/assets/game-bg.png');
    this.load.image('player', '../src/assets/player.png');
    this.load.image('platforms', '../src/assets/bomb1.png');
    // this.load.spritesheet('background', 
    //     '../src/assets/game-bg.jpeg',
    //     { frameWidth: 32, frameHeight: 48 }
    // );
    
  }

  create() {
    this.tileSprite = this.add.tileSprite(400, 300, 0, 0, 'background');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'player').set;
    // this.add.image(400,300,'player');

  }
}

export default GameStart;