import 'pixi';
import 'p2';
import Phaser from 'phaser';


class Game extends Phaser.Game {

    constructor() {

        const width = 800;
        const height = 600;
        super(width, height, Phaser.AUTO, 'content', null, {
          preload: preload,
          create: create
        });
        this.__preload()
            .__create();

    }
    __preload() {
        return this;

    }
    __create() {
        return this;
    }
}

window.game = new Game()
