class GameMain extends Phaser.Scene {
  constructor() {
    super({key: "GameMain"});
  }

  preload() {

  }

  create() {
    this.scene.start(GameStart);
  }

}