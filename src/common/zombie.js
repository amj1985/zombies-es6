import BasePlayer from './basePlayer.js';
import Animations from '../config/animations.js';

export default class Zombie extends BasePlayer {
    constructor(game, config) {
        super(game, config.x, config.y, config.spriteSheet, config.frameName);
        this.__registerAnimations()
            .__playBaseAnimation();
    }
    __registerAnimations() {
        super.registerAnimations(new Animations().zombie);
        return this;
    }
    __playBaseAnimation() {
       this.animations.play('rightIdle');
    }
    __onAttack() {
      let animation = this.isLookingAt === 'left' ? 'leftAttack' : 'rightAttack';
      this.animations.play(animation);
    }
}
