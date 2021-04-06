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
    this.load.spritesheet('dude', 
        '../dist/player-sprite.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    
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

    var player = this.physics.add.sprite(100,250, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start:0, end:3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame:4}],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1
    });

    player.body.setGravityY(300);

    this.physics.add.collider(player, platforms);

    let cursors = this.input.keyboard.createCursorKeys();

    if(cursors.left.isDown) {
      player.setVelocity(-160);
      player.anims.play('left', true);
    }
    else if(cursors.right.isDown) {
      player.setVelocity(160);
      player.anims.play('right', true);
    }
    else {
      player.setVelocity(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
      {
        player.setVelocityY(-330);
      }

  }
}

export default GameStart;