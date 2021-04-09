import Phaser from "phaser"

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


    // const submitBtn = document.querySelector('button');

    // submitBtn.onclick = () => {
    //   const name = document.querySelector('input').value;
    //   if (validateName(name) === false) {
    //     this.add.text(540, 500, 'Name too short/too long', { fontSize: '25px', fill: '#ffffff' });
    //   } else {
    //     this.registry.set('playerName', name);
    //     this.registry.set('score', this.highScores);
    //     this.scene.start('Menu');
    //   }
    // };

    this.gameOver = false;

    //Platform group
    let platforms;
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 668,'ground').setScale(5.2).refreshBody();
    platforms.create(900, 400, 'ground').setScale(2).refreshBody();
    platforms.create(50, 250, 'ground');
    platforms.create(550, 220, 'ground');

    //Bomb group
    let bombs = this.physics.add.group();
    
    //Game player and its settings
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
      key: 'down',
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

    // this.player.body.setGravityY(300);

    this.cursors =this.input.keyboard.createCursorKeys();

    function hitBomb (player, bomb){
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      this.gameOver = true;
    }
      

    //Add star group
    let stars = this.physics.add.group();
    stars.enableBody = true;
    stars.physicsBodyType = Phaser.Physics.ARCADE;
    
    //setup stars physics body
    function addStarGroup() {
      for(let i=0; i<12; i++) {
        let star = stars.create(200+i*48, 50, 'star');
        star.body.collideWorldBounds = true;
        star.body.velocity.setTo(200,200);
        star.body.bounce.set(1);
      }
    }
    addStarGroup();

    stars.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    function collectStar (player, star)
      {
          star.disableBody(true, true);
          score += 10;
          scoreText.setText('Score: ' + score);

          if (stars.countActive(true) < 9)
            {
              addStarGroup();
                let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                for(let i=0; i<4; i++){
                  let bomb = bombs.create(x, 16, 'bomb');
                  bomb.setBounce(1);
                  bomb.setCollideWorldBounds(true);
                  bomb.setVelocity(Phaser.Math.Between(-300, 300), 30);
                }
            }

      }

    let score = 0;
    let scoreText;

    //Score
    scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: 'white'});

  }

  update() {

    if(this.gameOver) {
      // return;
      this.scene.start('GameEnd');
    }

    if(this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if(this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } 
    else if(this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('up', true);
    }
    else if(this.cursors.down.isDown) {
      this.player.setVelocityY(160);
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

export default GameStart ;