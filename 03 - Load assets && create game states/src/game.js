import 'pixi';
import 'p2';
import Phaser from 'phaser';

class Game extends Phaser.Game {

  constructor() {
    super(1920, 1080, Phaser.AUTO, 'content');
  }

  _initializeStates() {
    this.state.add('Boot', GameLoader, false);
    this.state.add('Preload', AssetLoader, false);
    this.state.add('Scene', SceneLoader, false);
    this.state.start('Boot');
  }
}
window.onload = () => new Game();
