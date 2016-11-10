import Config from './config.js';
import BangkokStage from '../../modules/stages/bangkok/bangkokStage.js';
import ThailandStage from '../../modules/stages/thailand/thailandStage.js';
import RoadStage from '../../modules/stages/road/roadStage.js';

export default class StartScene extends Phaser.Group {
    constructor(game) {
        super(game);
        this.game = game;
        this._initialize();
        //this.game.time.events.add(Phaser.Timer.SECOND * 0.1, () => , this);
    }
    _initialize() {
        this.game.music.play('menu');
        this._initializeConfig()
            ._initializeBackground()
            ._initializeBlackMask()
            ._initializeText()
            ._initializeButton();
    }
    _initializeConfig() {
        this.config = Object.assign({}, new Config());
        return this;
    }
    _initializeBackground() {
        this.backGround = this.add(new Phaser.Sprite(this.game, 0, 0, this.config.background));
        return this;
    }
    _initializeBlackMask() {
        this.blackMask = this.add(new Phaser.Sprite(this.game, 0, 0, this.config.blackMask));
        this.blackMask.alpha = 0;
        return this;
    }
    _initializeText() {
        this.textInfo = this.add(new Phaser.Text(this.game, this.config.textInfoX, this.config.textInfoY, this.config.textInfo, this.config.style));
        return this;
    }
    _initializeButton() {
        this.buttonPlay = this.add(new Phaser.Button(this.game, this.game.world.centerX, 600,
            'buttonPlay', this._onPlay, this, 'button_on', 'button'));
        this.buttonPlay.scale.setTo(2, 2);
        this.buttonPlay.anchor.setTo(0.5, 0.5);
        this.buttonText = this.add(new Phaser.Text(this.game, this.game.world.centerX, 600, this.config.textButton, this.config.textButtonStyle));
        this.buttonText.anchor.setTo(0.5, 0.5);
        return this;
    }
    _onPlay() {
        this.game.music.stop('menu');
        this.game.effects.play('start');
        this.__animateFadeIn()
            .then(() => this._bankgogStage())
            .then(() => this._thailandStage())
            .then(() => this._roadStage())
            .catch(() => {
                this._gameOver();
            });
    }
    _gameOver() {

    }
    _bankgogStage() {
        this.backGround.visible = false;
        return new Promise((resolve, reject) => {
            new BangkokStage(this.game, resolve, reject, 'bangkok');
        });
    }
    _thailandStage() {
        return new Promise((resolve, reject) => {
            new ThailandStage(this.game, resolve, reject, 'thailand');
        });
    }
    _roadStage() {
        return new Promise((resolve, reject) => {
            new RoadStage(this.game, resolve, reject, 'road');
        });
    }
    __animateFadeIn() {
        return new Promise((resolve) => {
            this.__hideUiElements();
            this.game.add.tween(this.blackMask)
                .to({
                    alpha: 1
                }, 2000, Phaser.Easing.Linear.None, true)
                .onComplete.add(() => resolve(), this);
        });

    }
    __hideUiElements() {
        this.buttonPlay.visible = false;
        this.buttonText.visible = false;
        this.textInfo.visible = false;
    }
}
