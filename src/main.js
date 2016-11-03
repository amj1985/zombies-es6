import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Config from './modules/config.js';

class Game extends Phaser.Game {

    constructor() {
        super(800, 600, Phaser.AUTO, 'content', null);
        this.__initializeConfig()
        .__registerAtlases()
        .__initializeSplashScreen()
        .__initializeSceneries();


    }
    __initializeConfig() {
      this.config = Object.assign({}, new Config());
      return this;
    }
    __registerAtlases() {
      return this;
    }
    __initializeSplashScreen() {
      return this;
    }
    __initializeSceneries() {
      return this;
    }
}

window.onLoad = () => new Game()
