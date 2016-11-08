import BaseStage from '../../../common/baseStage.js';
import Config from './config.js';
import Animations from '../../../config/animations.js';

export default class BangkokStage extends BaseStage {
    constructor(game) {
        super(game);
        this.config = Object.assign({}, new Config());
        this.__initializeBackground()
            .__initializeGround()
            .__initializeGuy()
            .__initializePlatforms()
            .__initializeZombies()
            .__initializeBoomExplosion()
            .__initializeBlackMask()
            .__initializeTextAreas()
            .__hookButtonEvents()
            .__start();
    }
    __initializeBackground() {
        let background = this.config.background
        super.initializeBackground(background);
        return this;
    }
    __initializeTextAreas() {
        let textInfo = this.config.textInfo;
        super.initializeTextAreas(textInfo);
        return this;
    }
    __initializeGuy() {
        let guy = this.config.guy;
        super.initializeGuy(guy);
        return this;
    }
    __initializeBlackMask() {
        let blackMask = this.config.blackMask;
        super.initializeBlackMask(blackMask);
        return this;
    }
    __initializePlatforms() {
        let platforms = this.config.platforms;
        super.initializePlatforms(platforms);
        return this;
    }
    __initializeGround() {
        let groundPositions = [0, 750, 1500];
        super.initializeGround(groundPositions);
        return this;
    }
    __hookButtonEvents() {
        this.guy.hookButtonEvents();
        return this;
    }
    __initializeZombies() {
        let zombies = this.config.zombies;
        super.initializeZombies(zombies);
        return this;
    }
    __initializeBoomExplosion(){
      let explosion = this.config.explosion;
      super.initializeBoomExplosion(explosion, new Animations().explosion);
      return this;
    }
    __start() {
        this.__animatePlayerIn()
            .then(() => this.__animateTextIntro())
            .then(() => this.__animateZombiesIn())
            .then(() => this.__initializePhysics())
            .then(() => this.__animateZombiesRoutine())
            .then(() => this.__hookColliderEvents());
    }
    __hookColliderEvents() {
      super.hookColliderEvents();
      return this;
    }
    __animateZombiesRoutine() {
        this.mainText.visible = false;
        super.animateZombiesRoutine(this.zombies, this.config.zombies);
        return this;
    }
    __initializePhysics() {
        this.guy.initializePhysics();
        this.zombies.map((zombie) => zombie.initializePhysics());
    }
    __animateZombiesIn() {
        let offsetY = this.config.zombies[0].tween.offsetY;
        return super.animateZombiesIn(offsetY);
    }
    __animatePlayerIn() {
        let offsetX = this.config.guy.offsetX;
        return super.animatePlayerIn(offsetX);
    }
    __animateFadeOut() {
        super.animateFadeOut();
    }
    __animateFadeIn() {
        super.animateFadeIn();
    }
    __animateTextIntro() {
        return super.animateTextIntro();
    }
}
