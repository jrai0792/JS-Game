import Phaser from 'phaser';
import { getLocalScores } from '../local-storage';
import { sendScore } from '../leader-api';


class GameEnd extends Phaser.Scene {
  constructor() {
    super({ key: 'GameEnd' });
  }

  preload() {
    this.load.image('gameover', '../dist/gameover.png');
    this.load.image('play', '../dist/play-btn.png');
    this.load.image('score', '../dist/score.png');
  }

  create() {
    this.add.text(500, 230, 'GAME OVER', { fontSize: '75px', fill: '#ffffff' });
    this.playBtn = this.add.image(600, 450, 'play').setScale(0.1);
    this.scoreBtn = this.add.image(600, 500, 'score').setScale(0.1);

    this.scores = getLocalScores();

    this.playername = this.registry.get('PlayerName');

    sendScore(this.playername, this.scores[0]);

    this.playBtn.setInteractive().on('pointerdown', function GameStart() {
      this.scene.start('PlayerName');
    }, this);

    this.scoreBtn.setInteractive().on('pointerdown', function Score() {
      this.scene.start('Score');
    }, this);
  }
}

export default GameEnd;