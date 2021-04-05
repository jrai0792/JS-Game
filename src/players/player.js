import Phaser from 'phaser';

class Player extends Phaser.Scene {
  constructor(key) {
    super({key: 'Player'});
  }

  preload() {
    this.load.image('dude', '../dist/player-sprite.png');
  }

  create() {
    
  }
}