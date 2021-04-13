import Phaser from 'phaser';
import { storeScores } from '../local-storage';

class GameStart extends Phaser.Scene {
  constructor() {
    super({ key: 'GameStart' });
  }

  preload() {
    this.load.image('sky', '../dist/assets/sky.png');
    this.load.image('ground', '../dist/assets/platform.png');
    this.load.image('star', '../dist/assets/star.png');
    this.load.image('bomb', '../dist/assets/bomb.png');
    this.load.spritesheet('dude',
      '../dist/assets/dude.png',
      {
        frameWidth: 32,
        frameHeight: 48,
      });
  }

  create() {
    this.gameOver = false;

    // Platform group
    // let platforms;
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 668, 'ground').setScale(5.2).refreshBody();
    platforms.create(900, 400, 'ground').setScale(2).refreshBody();
    platforms.create(50, 250, 'ground');
    platforms.create(550, 220, 'ground');

    // Bomb group
    const bombs = this.physics.add.group();

    // Game player and its settings
    /* eslint-disable-next-line */
    const player = this.player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Player animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 8 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });


    // setting star animation
    this.anims.create({
      frames: this.anims.generateFrameNumbers('star', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    // this.player.body.setGravityY(300);

    this.cursors = this.input.keyboard.createCursorKeys();

    function hitBomb(player) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      this.gameOver = true;
    }


    // Add star group
    const stars = this.physics.add.group();
    stars.enableBody = true;
    stars.physicsBodyType = Phaser.Physics.ARCADE;

    // setup stars physics body
    function addStarGroup() {
      for (let i = 0; i < 12; i += 1) {
        const star = stars.create(200 + i * 48, 50, 'star');
        star.body.collideWorldBounds = true;
        star.body.velocity.setTo(200, 200);
        star.body.bounce.set(1);
      }
    }
    addStarGroup();

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(stars, platforms);
    let scoreText;

    function collectStar(player, star) {
      star.disableBody(true, true);
      this.score += 10;
      scoreText.setText(`Score: ${this.score}`);

      if (stars.countActive(true) < 9) {
        addStarGroup();
        const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        for (let i = 0; i < 4; i += 1) {
          const bomb = bombs.create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-300, 300), 30);
        }
      }
    }

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.score = 0;

    this.playername = this.registry.get('PlayerName');

    // Score
    this.add.text(10, 10, `Hi ${this.playername}`, { fontSize: '32px', fill: 'white' });
    scoreText = this.add.text(20, 46, 'Score: 0', { fontSize: '32px', fill: 'white' });
  }

  update() {
    if (this.gameOver) {
      storeScores(this.score);
      this.scene.start('GameEnd');
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('up', true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default GameStart;