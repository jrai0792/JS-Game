import Phaser from "phaser";
import GameStart from './scenes/GameStart'
import PlayerName from './scenes/playername'
import GameEnd from './scenes/GameEnd';
import GameMenu from './scenes/gamemenu';
import Score from './scenes/score';

let game;

let resize = () => {
  let canvas = document.querySelector('canvas');
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth/windowHeight;
  let gameRatio = game.config.width / game.config.height;

  if(windowRatio < gameRatio){
    
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowWidth / gameRatio}px`;
  }else {
    canvas.style.width = `${windowHeight * gameRatio}px`;
    canvas.style.height = `${windowHeight}px`;
  }
};

window.onload = function () {

  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1430,
    height: 770,
    pixelArt : true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {x:0,  y:0 },
        debug: false
      }
    },
    scene: [
      GameMenu,
      GameStart,
      PlayerName,
      GameEnd,
      Score
    ]
  };
  
  game = new Phaser.Game(config);
  window.focus();
  resize();
  window.addEventListener('resize', resize, false);
};


// game.scene.add(GameMenu);

// game.scene.start(GameMenu);

