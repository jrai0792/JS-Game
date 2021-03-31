class GameStart extends Phaser.Scene{
  
  constructor() {
    super({key: "GameStart"});
  }
  preload() {

  }

  create() {
    this.add.text(400, 250, 'Hello, world!!');
  }
}
