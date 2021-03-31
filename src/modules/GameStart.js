import Phaser from "phaser";

class GameStart extends Phaser.Scene{

  constructor() {
    super({key: 'GameStart'});
  }
  preload() {

  }

  create() {
    this.add.text(200, 150, 'Hello, world!!');
  }
}

export default GameStart;