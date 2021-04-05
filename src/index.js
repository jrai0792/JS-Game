import Phaser from "phaser";
import GameStart from './scenes/GameStart'
import GameMain from './scenes/GameMain'
import GameEnd from './scenes/GameEnd'
import Player from './players/Player'

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 700,
  height: 380,
  zoom: 2,
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

