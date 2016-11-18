import BaseStage from '../../../common/baseStage.js';
import Config from './config.js';
import Animations from '../../../config/animations.js';

export default class BangkokStage extends BaseStage {
  constructor(game, gameResolver, gameRejector, stageName, hub, connectionIds) {
    super(game, gameResolver, gameRejector, stageName, hub, connectionIds);
    this.config = Object.assign({}, new Config());
    this.__initializeBackground()
      .__initializeZombies()
      .__initializePlayers()
      .__initializePlatforms()
      .__initializeGround()
      .__initializeHearts()
      .__initializeBoomExplosion()
      .__initializeBlackMask()
      .__initializeTextAreas()
      .__start();
  }
  __initializeBloodArea() {
    let config = this.config.bloodArea;
    super.__initializeBloodArea(config);
  }
  __initializeBackground() {
    let background = this.config.background
    super.__initializeBackground(background);
    return this;
  }
  __initializeTextAreas() {
    let textInfo = this.config.textInfo;
    super.__initializeTextAreas(textInfo);
    return this;
  }
  __initializePlayers() {
    let players = this.config.players;
    super.__initializePlayers(players);
    return this;
  }
  __initializeHearts() {
    let hearts = this.config.hearts;
    super.__initializeHearts(hearts);
    return this;
  }
  __initializeBlackMask() {
    let blackMask = this.config.blackMask;
    super.__initializeBlackMask(blackMask);
    return this;
  }
  __initializePlatforms() {
    let platforms = this.config.platforms;
    super.__initializePlatforms(platforms);
    return this;
  }
  __initializeGround() {
    let groundPositions = [0, 750, 1500];
    super.__initializeGround(groundPositions);
    return this;
  }
  __initializeZombies() {
    let zombies = this.config.zombies;
    super.__initializeZombies(zombies);
    return this;
  }
  __hookButtonEvents() {
    this.players.map((guy) => {
      guy.hookButtonEvents();
    })
    return this;
  }
  /**
   * TODO: It needs a refactor, register animations should be in a initial
   *  state instead on each stage
   */
  __initializeBoomExplosion() {
    let explosion = this.config.explosion;
    super.__initializeBoomExplosion(explosion, new Animations().explosion);
    return this;
  }
  __start() {
    this.__animatePlayerIn()
      .then(() => this.__animateText())
      .then(() => this.__animateZombiesIn())
      .then(() => this.__animateZombiesRoutine())
      .then(() => this.__initializeCountDown())
      .then(() => this.__hookColliderEvents())
      .then(() => this.__initializePhysics())
      .then(() => this.__hookSignalEvents())
      .then(() => this.__hookButtonEvents());
    this.__initializeBloodArea();
  }
  __initializeCountDown() {
    let time = this.config.timeout;
    super.__initializeCountDown(time);
    return this;
  }
  __hookColliderEvents() {
    super.__hookColliderEvents();
    return this;
  }
  __hookSignalEvents(){
    super.__hookSignalEvents();
    return this;
  }
  __animateZombiesRoutine() {
    this.mainText.visible = false;
    super.__animateZombiesRoutine(this.zombies, this.config.zombies);
    return this;
  }
  __initializePhysics() {
    return new Promise((resolve) => {
      this.players.map((guy) => {
        guy.initializePhysics();
      });
      Promise.all(this.zombies.map((zombie) => zombie.initializePhysics()))
        .then(() => resolve());
    });
  }
  __animateZombiesIn() {
    let offsetY = this.config.zombies[0].tween.offsetY;
    return super.__animateZombiesIn(offsetY);
  }
  __animatePlayerIn() {
    return super.__animatePlayerIn(this.config.players);
  }
  __animateText() {
    let text = this.config.textInfo.startText;
    return super.__animateText(text);
  }
}
