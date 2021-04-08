import Phaser from "phaser"
// import start from "../assets/gamestart.jpeg"

class GameStart extends Phaser.Scene{

  // private keys = Phaser.Input.Keyboard.CursorKeys;

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
    let platforms;

    //Platform group
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568,'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(550, 220, 'ground');

    //Bomb group
    let bombs = this.physics.add.group();
    
    //Game player
    let  player = this.player =this.physics.add.sprite(100,450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //Player animations
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
      key: 'up',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 8}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1
    });


    //setting star animation
    this.anims.create({
      frames: this.anims.generateFrameNumbers('star', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    player.body.setGravityY(300);

    this.physics.add.collider(player, platforms);

    this.physics.add.collider(bombs, platforms);

    this.cursors =this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    function hitBomb (player, bomb)
      {
          this.physics.pause();

          player.setTint(0xff0000);

          player.anims.play('turn');

          gameOver = true;
      }

    let stars = this.physics.add.group({
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
          score += 10;
          scoreText.setText('Score: ' + score);

          if (stars.countActive(true) === 0)
            {
                stars.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);

                });
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        
            }

      }

    this.physics.add.overlap(player, stars, collectStar, null, this);

    let score = 0;
    let scoreText;

    scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: 'white'});
  }

  update() {
    if(this.cursors.left.isDown) {
      this.player.setVelocity(-160);
      this.player.anims.play('left', true);
    }
    else if(this.cursors.right.isDown) {
      this.player.setVelocity(160);
      this.player.anims.play('right', true);
    } 
    else if(this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('up', true);
    }
    else {
      this.player.setVelocity(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
      {
        this.player.setVelocityY(-330);
      }

  }
}

export default GameStart;