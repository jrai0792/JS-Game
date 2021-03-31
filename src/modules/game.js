// import Phaser from "phaser";
// import GameStart from './GameStart.js'
// import GameMain from './GameMain.js'
// import GameEnd from './GameEnd.js'

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
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

var game = new Phaser.Game(config);