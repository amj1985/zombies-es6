import Config from './config.js';

export default class SplashScreen extends Phaser.Group {
    constructor(game) {
        super(game);
        this.game = game;
        this.__initialize();
    }
    __initialize() {
        this.__initializeConfig()
            .__initializeBackground()
            .__initializeText();
    }
    __initializeConfig() {
        this.config = Object.assign({}, new Config());
        return this;
    }
    __initializeBackground() {
        this.backGround = this.add(new Phaser.Sprite(this.game, 0, 0, this.config.background));
        return this;
    }
    __initializeText(){
      debugger;
      this.buttonPlay = this.add(new Phaser.Text(this.game, this.game.world.centerX - 95, 400, this.config.text, this.config.style));
    }
    __onPlay(){

    }
}
