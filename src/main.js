import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Config from './modules/config.js';

class Game extends Phaser.Game {

    constructor() {
        super(800, 600, Phaser.AUTO, 'content', null);
                debugger;
        this.config = Object.assign({}, new Config());
        this.__preload()
            .__create();
    }
    __preload() {
      return new Promise((resolve) => {
        resolve();
        return this;
      });

    }
    __create() {
        return this;
    }
}

window.game = new Game()
