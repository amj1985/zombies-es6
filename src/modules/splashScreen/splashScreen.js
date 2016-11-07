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
            .__initializeBlackMask()
            .__initializeText()
            .__initializeButton();
    }
    __initializeConfig() {
        this.config = Object.assign({}, new Config());
        return this;
    }
    __initializeBackground() {
        this.backGround = this.add(new Phaser.Sprite(this.game, 0, 0, this.config.background));
        return this;
    }
    __initializeBlackMask() {
        this.blackMask = this.add(new Phaser.Sprite(this.game, 0, 0, this.config.blackMask));
        this.blackMask.alpha = 0;
        return this;
    }
    __initializeText() {
        this.textInfo = this.add(new Phaser.Text(this.game, this.config.textInfoX, this.config.textInfoY, this.config.textInfo, this.config.style));
        return this;
    }
    __initializeButton() {
        this.buttonPlay = this.add(new Phaser.Button(this.game, this.game.world.centerX, 600,
            'button', this.__onPlay, this, 'button', 'button_on'));
        this.buttonPlay.scale.setTo(2, 2);
        this.buttonPlay.anchor.setTo(0.5, 0.5);
        this.buttonText = this.add(new Phaser.Text(this.game, this.game.world.centerX, 600, this.config.textButton, this.config.textButtonStyle));
        this.buttonText.anchor.setTo(0.5, 0.5);
        return this;
    }
    __onPlay() {
        this.__animateFadeIn()
        .then(() => console.log('fadeInComplete'));
    }
    __animateFadeIn() {
      return new Promise((resolve) => {
        this.__hideUiElements();
        this.game.add.tween(this.blackMask)
        .to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)
        .onComplete.add(() => resolve(), this);
      });

    }
    __hideUiElements(){
      this.buttonPlay.visible = false;
      this.buttonText.visible = false;
      this.textInfo.visible = false;
    }
}
