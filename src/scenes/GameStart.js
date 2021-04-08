import Phaser from "phaser"
// import start from "../assets/gamestart.jpeg"

class GameStart extends Phaser.Scene{

  constructor() {
    super({key: 'GameStart'});
  }

  preload() {
    this.load.image('sky', '../src/assets/sky.png');
    this.load.image('ground', '../src/assets/platform.png');
    this.load.image('star', '../src/assets/star.png');
    this.load.image('bomb', '../src/assets/bomb.png');
    this.load.spritesheet('dude', 
        '../src/assets/dude.png',
        { frameWidth: 32, 
          frameHeight: 48 }
    );
    
  }

  create() {

    this.add.image(400,300,'sky');
    this.add.image(400,300,'star');
    var platforms;

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568,'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(550, 220, 'ground');

    var player = this.physics.add.sprite(100,450, 'dude');

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

    var cursors = this.input.keyboard.createCursorKeys();

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

    var stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {x: 12, y:0, stepX: 70}
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);

    function collectStar (player, star)
{
    star.disableBody(true, true);
}

    this.physics.add.overlap(player, stars, collectStar, null, this);
  }

  update() {


  }
}

export default GameStart;