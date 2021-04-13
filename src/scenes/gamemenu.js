import Phaser from 'phaser';

class GameMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'GameMenu' });
  }

  preload() {
    this.load.image('sky', '../dist/sky.png');
    this.load.image('highScore', '../dist/score.jpeg');
    this.load.image('playBtn', '../dist/play-btn.png');
  }

  create() {
    this.playBtn = this.physics.add.sprite(1050, 250, 'playBtn').setScale(0.1);
    this.score = this.physics.add.sprite(1050, 350, 'highScore').setScale(0.3);
    this.playBtn.setInteractive().on('pointerdown', function GameStart() {
      this.scene.start('PlayerName');
    }, this);

    this.score.setInteractive().on('pointerdown', function Score() {
      this.scene.start('Score');
    }, this);
  }
}

export default GameMenu;