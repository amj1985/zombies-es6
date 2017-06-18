import 'pixi';
import 'p2';
import Phaser from 'phaser';
import GameLoader from './common/states/gameLoader.js';
import AssetLoader from './common/states/assetLoader.js';
import SceneLoader from './common/states/sceneLoader.js';

class Game extends Phaser.Game {

  constructor() {
    super(1920, 1080, Phaser.AUTO, 'content');
    console.clear();
    this._initializeStates();
  }

  _initializeStates() {
    this.state.add('Boot', GameLoader, false);
    this.state.add('Preload', AssetLoader, false);
    this.state.add('Scene', SceneLoader, false);
    this.state.start('Boot');
  }
}
window.onload = () => new Game();
