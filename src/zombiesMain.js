import Phaser from '../node_modules/phaser/build/phaser.js';

export class zombiesMain extends Phaser.Game {
  constructor(game, parent, config, phaser = Phaser) {
    super(game, parent);

    this.game = game;
    this.config = config;
    this.phaser = phaser

    this.__init2ialize();
  }

  __initialize() {
    this.__initializeBackground();
    console.log("Initialized");
  }
  __initializeBackground() {
    this.backGround = new this.phaser.Sprite();
  }

}
var zombiesMain2 = new zombiesMain();
