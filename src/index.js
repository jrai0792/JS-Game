import Phaser from "phaser";
import GameStart from './modules/GameStart'
import GameMain from './modules/GameMain'
import GameEnd from './modules/GameEnd'

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 620,
  height: 440,
  // zoom: 2,
  pixelArt : true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {x:0,  y: 0 }
    }
  },
  scene: [
    GameStart,
    GameMain,
    GameEnd
  ]
};

const game = new Phaser.Game(config);

game.scene.add(GameStart);

game.scene.start(GameStart);