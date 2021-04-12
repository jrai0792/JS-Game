import Phaser from 'phaser';
import {getScore} from '../leader-api';

class Score extends Phaser.Scene {
  constructor() {
    super({key: 'Score'});
  }

  preload() {
    this.load.image('backBtn', '../src/assets/back-btn.jpeg')
  }

  create() {
    getScore().then((result) => {
        this.add.text(400, 300, `${result[0][1]} : ${result[0][0]}`,{ fontSize: '65px', fill: '#ffffff' });
    });
    
    this.btn = this.add.image(240, 100, 'backBtn').setScale(0.1);
    this.btn.setInteractive().on('pointerdown',
      function changeScene() {
        this.scene.switch('GameMenu');
      },
    this);  
  }
}

export default Score;