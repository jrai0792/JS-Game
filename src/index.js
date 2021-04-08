import Phaser from "phaser";
import GameStart from './scenes/GameStart'
import GameMain from './scenes/GameMain'
import GameEnd from './scenes/GameEnd';
import GameMenu from './scenes/gamemenu';
import Player from './players/Player'

var player;

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1430,
  height: 770,
  // zoom: 2,
  pixelArt : true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {x:0,  y: 0 }
    }
  },
  scene: [
    GameMenu,
    GameStart,
    GameMain,
    GameEnd
  ]
};

const game = new Phaser.Game(config);


// game.scene.add(GameMenu);

// game.scene.start(GameMenu);

