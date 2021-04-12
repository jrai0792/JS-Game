import Phaser from 'phaser';

class Score extends Phaser.Scene {
  constructor() {
    super({key: 'Score'});
  }

  preload() {
    this.load.image('backBtn', '../src/assets/back-btn.jpeg')
  }

  create() {
    this.text = this.add.text(430, 150, 'Top Scores : ', { fontSize: '65px', fill: '#ffffff' });
    let height = 210;

    this.scores = this.registry.get('score');
    console.log(this.scores);
    // for (let i = 0; i < this.scores.length; i += 1) {
    //   this.add.text(530,
    //     height += 60,
    //     `${i + 1}. ${this.scores[i].user}: ${this.scores[i].score}`,
    //     { fontSize: '40px', fill: '#ffffff' });
    // }

    this.btn = this.add.image(240, 100, 'backBtn').setScale(0.1);
    this.btn.setInteractive().on('pointerdown',
      function changeScene() {
        this.scene.switch('GameMenu');
      },
      this);
  }
}

export default Score;