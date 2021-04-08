import Phaser from "phaser";
import GameStart from './scenes/GameStart'
import GameMain from './scenes/GameMain'
import GameEnd from './scenes/GameEnd';
import GameMenu from './scenes/gamemenu';
import Player from './players/Player'

let game;

let resize = () => {
  const canvas = document.querySelector('canvas');
  const width = window.innerWidth;
  const height = window.innerHeight;
  const windowRatio = width/height;
  const gameRatio = game.config.width / game.config.height;

  if(windowRatio<gameRatio){
    
    canvas.style.width = `${width}px`;
    canvas.style.height = `${width / gameRatio}px`;
  }else {
    canvas.style.width = `${height * gameRatio}px`;
    canvas.style.height = `${height}px`;
  }
};

window.onload = function () {

  const config = {
    type: Phaser.AUTO,
    parent: 'game',
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
    ],
    backgroundColor: 	0x66ffd9
  };
  
  game = new Phaser.Game(config);
  window.focus();
  resize();
  window.addEventListener('resize', resize, false);
};


// game.scene.add(GameMenu);

// game.scene.start(GameMenu);

