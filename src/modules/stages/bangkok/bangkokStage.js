import BaseStage from '../../../common/baseStage.js';
import Config from './config.js';
export default class BangkokStage extends BaseStage {
    constructor(game) {
        super(game);
        this.config = Object.assign({}, new Config());
        this.__initializeBackground()
            .__initializeGround()
            .__initializeGuy()
            .__initializePlatforms()
            .__initializeZombies()
            .__initializeBlackMask()
            .__hookButtonEvents();
    }
    __initializeBackground() {
        super.initializeBackground(this.config.background);
        return this;
    }
    __initializeGuy() {
        super.initializeGuy(this.config.guy);
        return this;
    }
    __initializeBlackMask() {
        super.initializeBlackMask(this.config.blackMask);
        return this;
    }
    __initializePlatforms() {
        super.initializePlatforms(this.config.platforms);
        return this;
    }
    __initializeGround() {
        super.initializeGround();
        return this;
    }
    __hookButtonEvents() {
        this.guy.hookButtonEvents();
        return this;
    }
    __initializeZombies() {
        super.initializeZombies(this.config.zombies);
        return this;
    }
    __animateFadeOut() {
        super.animateFadeOut();
    }
    __animateFadeIn() {
        super.animateFadeIn();
    }
}
