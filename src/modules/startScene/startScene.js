import Config from './config.js';
import BangkokStage from '../../modules/stages/bangkok/bangkokStage.js';
import ThailandStage from '../../modules/stages/thailand/thailandStage.js';
import Hub from '../../common/signalrHub.js';
import Utils from '../../common/utils.js';

export default class StartScene extends Phaser.Group {
  constructor(game) {
    super(game);
    this.game = game;
    this.connectionIds = [];
    this._initialize();
    //this.game.time.events.add(Phaser.Timer.SECOND * 0.1, () => , this);
  }
  _initialize() {
    this.game.music.play('menu');
    this._initializeConfig()
      ._initializeBackground()
      ._initializeBlackMask()
      ._initializeText()
      ._initializeButton()
      ._initializeHub();
  }
  _initializeHub() {
    this.hubManager = new Hub();
    this.hubManager.setParent(this)
    return this;
  }
  onPlayerConnected(connectionId) {
    if (connectionId !== undefined) {
      this.connectionIds.push(connectionId);
    }

    if (this.connectionIds.length == 2) {
      this._onPlay();
    }
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
    this.textInfo = this.add(new Phaser.Text(this.game, this.game.world.centerX, this.config.textInfoY, this.config.textInfo, this.config.style));
    this.textInfo.anchor.setTo(0.5, 0.5);
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
    this.game.music.stop('gameOver');
    this.game.music.stop('menu');
    this.game.effects.play('start');
    this.__animateFadeIn()
      .then(() => this._bankgogStage())
      .then(() => this._thailandStage())
      .then(() => this._winGame())
      .catch((reason) => {
        console.log(reason);
        this._gameOver();
      });
  }
  _winGame() {
    this._showUiElements();
    this.game.world.bringToTop(this.buttonPlay);
    this.game.world.bringToTop(this.buttonText);
    this.textInfo.setText('Thank you for playing');
    this.buttonText.visible = false;
  }
  _gameOver() {
    this._showUiElements();
    this.game.world.bringToTop(this.buttonPlay);
    this.game.world.bringToTop(this.buttonText);
    this.textInfo.setText('You have a new chance');
    this.buttonText.setText('Restart');
  }
  _bankgogStage() {
    this.backGround.visible = false;
    return new Promise((resolve, reject) => {
      this.actualStage = new BangkokStage(this.game, resolve, reject, 'bangkok', this.hubManager, this.connectionIds);
    });
  }
  _thailandStage() {
    return new Promise((resolve, reject) => {
      this.actualStage = void 0;
      this.actualStage = new ThailandStage(this.game, resolve, reject, 'thailand', this.hubManager, this.connectionIds);
    });
  }
  _roadStage() {
    return new Promise((resolve, reject) => {
      this.actualStage = void 0;
      this.actualStage = new RoadStage(this.game, resolve, reject, 'road', this.hubManager, this.connectionIds);
    });
  }
  __animateFadeIn() {
    return new Promise((resolve) => {
      this._hideUiElements();
      this.game.add.tween(this.blackMask)
        .to({
          alpha: 1
        }, 2000, Phaser.Easing.Linear.None, true)
        .onComplete.add(() => resolve(), this);
    });

  }
  _hideUiElements() {
    this.buttonPlay.visible = false;
    this.buttonText.visible = false;
    this.textInfo.visible = false;
  }
  _showUiElements() {
    this.buttonPlay.visible = true;
    this.buttonText.visible = true;
    this.textInfo.visible = true;
  }
}
