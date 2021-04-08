import Phaser from 'phaser';
import highScore from '../assets/score.jpeg';
import playBtn from '../assets/play-btn.png';

class GameMenu extends Phaser.Scene {
  constructor() {
    super({key: 'GameMenu'});
  }

  preload() {
    this.load.image('highScore', '../src/assets/score.jpeg');
    this.load.image('playBtn', '../src/assets/play-btn.png');
  }

  create() {
    this.playBtn = this.physics.add.sprite(1050,250,'playBtn').setScale(0.1);
    this.score = this.physics.add.sprite(1050,350,'highScore').setScale(0.3);

    this.playBtn.setInteractive().on('pointerdown', function GameStart() {
      this.scene.start('GameStart');
    }, this);
  }
}

export default GameMenu;