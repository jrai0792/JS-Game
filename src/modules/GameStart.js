import Phaser from "phaser";
// import start from "../assets/gamestart.jpeg"

class GameStart extends Phaser.Scene{

  constructor() {
    super({key: 'GameStart'});
  }
  preload() {
    this.load.image('background', '../src/assets/game-bg.jpeg');
    this.load.image('player', '../dist/player.png');
    this.load.image('ground', '../dist/Stone.png');
    // this.load.spritesheet('background', 
    //     '../src/assets/game-bg.jpeg',
    //     { frameWidth: 32, frameHeight: 48 }
    // );
    
  }



  create() {
    this.tileSprite = this.add.tileSprite(400, 300, 0, 0, 'background');
    // this.add.image(100,100,0,0,'player');
    // this.add.image(150,150,0,0,'platforms');
    // platforms = this.physics.add.staticGroup();
    // platforms.create(400, 568, 'player').set;
    // this.add.image(400,300,'player');
    var platforms;

    platforms = this.physics.add.staticGroup();
    platforms.create(400,568,'ground').setScale(2).refreshBody();
    platforms.create(100, 100, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(350, 220, 'ground');

  }
}

export default GameStart;