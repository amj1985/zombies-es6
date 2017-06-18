import 'pixi';
import 'p2';
import Phaser from 'phaser';

class Game extends Phaser.Game {

  constructor() {
    super(1920, 1080, Phaser.AUTO, 'content');
  }

  _initializeStates() {
  }
}
window.onload = () => new Game();
