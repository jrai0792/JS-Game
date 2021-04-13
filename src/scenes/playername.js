import Phaser from 'phaser';

class PlayerName extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerName' });
  }

  create() {
    this.text = this.add.text(330, 150, '--Welcome to JS Game--', { fontSize: '60px', fill: '#ffffff' });

    this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ClickHere to enter your name and start the game.', { fontSize: 32 })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        const element = document.getElementById('input-box');
        if (element && element.style.display === 'none') {
          element.style.display = 'block';

          for (let i = 0; i < element.children.length; i++) {
          // it is an input element
            if (element.children[i].tagName === 'INPUT') {
              const btn = this.add.text(10, 100 + 20 * i, '');
              element.children[i].addEventListener('input', () => {
                this.registry.set('PlayerName', element.children[i].value);
              });
            }
            // it is the button
            else {
              element.children[i].addEventListener('click', () => {
                element.style.display = 'none';
                this.scene.start('GameStart');
              });
            }
          }
        }
      });
  }
}

export default PlayerName;