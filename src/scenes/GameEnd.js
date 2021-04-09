import Phaser from 'phaser';

class GameEnd extends Phaser.Scene {

  constructor() {
    super( {key: 'GameEnd'} );
  }

  preload() {
    this.load.image('gameover', '../src/assets/gameover.png');
    this.load.image('play', '../src/assets/play-btn.png');
    this.load.image('score', '../src/assets/score.png');
  }

  create() {
    this.add.text(500, 230, 'GAME OVER', { fontSize: '75px', fill: '#ffffff' });
    this.playBtn = this.add.image(600,450, 'play').setScale(0.1);
    this.add.image(600,500, 'score').setScale(0.1);

    this.playBtn.setInteractive().on('pointerdown', function GameStart() {
      this.scene.start('PlayerName');
    }, this);

  }
}

export default GameEnd;