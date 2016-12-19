import Stage from '../../../common/stage.js';
import Config from './config.js';
import Animations from '../../../config/animations.js';

export default class RoadStage extends Stage {
  constructor(game, gameResolver, gameRejector, stageName) {
    super(game, gameResolver, gameRejector, stageName);
    this.config = Object.assign({}, new Config());
    this.__initializeBackground()
      .__initializeZombies()
      .__initializeGuy()
      .__initializePlatforms()
      .__initializeGround()
      .__initializeHearts()
      .__initializeBoomExplosion()
      .__initializeBlackMask()
      .__initializeTextAreas()
      .__hookButtonEvents()
      .__start();
  }
  __initializeBackground() {
    let background = this.config.background
    super.__initializeBackground(background);
    return this;
  }
  __initializeBloodArea() {
    let config = this.config.bloodArea;
    super.__initializeBloodArea(config);
  }
  __initializeTextAreas() {
    let textInfo = this.config.textInfo;
    super.__initializeTextAreas(textInfo);
    return this;
  }
  __initializeGuy() {
    let guy = this.config.guy;
    super.__initializeGuy(guy);
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
      this.guy.hookButtonEvents();
      return this;
    }
    /**
     * TODO: A.M It needs a refactor, register animations should be in a initial
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
      .then(() => this.__initializePhysics())
      .then(() => this.__animateZombiesRoutine())
      .then(() => this.__initializeCountDown())
      .then(() => this.__hookColliderEvents())
      .then(() => this.__hookButtonEvents())
      .then(() => this.__animatePlatforms());
    this.__initializeBloodArea();

  }
  __animatePlatforms() {
    let platforms = this.config.platforms;
    super.__animatePlatforms();
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
  __animateZombiesRoutine() {
    this.mainText.visible = false;
    super.__animateZombiesRoutine(this.zombies, this.config.zombies);
    return this;
  }
  __initializePhysics() {
    this.guy.initializePhysics();
    this.zombies.map((zombie) => zombie.initializePhysics());
  }
  __animateZombiesIn() {
    let offsetY = this.config.zombies[0].tween.offsetY;
    return super.__animateZombiesIn(offsetY);
  }
  __animatePlayerIn() {
    let offsetX = this.config.guy.offsetX;
    return super.__animatePlayerIn(offsetX);
  }

  __animateText() {
    let text = this.config.textInfo.startText;
    return super.__animateText(text);
  }
}
