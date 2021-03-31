import Phaser from "phaser";
// import start from "../assets/gamestart.jpeg"

class GameStart extends Phaser.Scene{

  constructor() {
    super({key: 'GameStart'});
  }
  preload() {
    this.load.image('first', '../src/assets/gamestart.jpeg');
  }

  create() {
    this.add.image(200, 100, 'first');
  }
}

export default GameStart;