import BasePlayer from './basePlayer.js';
import Animations from '../config/animations.js';

export default class Zombie extends BasePlayer {
    constructor(game, config) {
        super(game, config.x, config.y, config.spriteSheet, config.frameName);
        this.registerAnimations()
            .__playBaseAnimation();
    }
    registerAnimations() {
        super.registerAnimations(new Animations().zombie);
        return this;
    }
    __playBaseAnimation() {
        this.animations.play('rightIdle');
    }
    attack() {
        super.onAttack();
    }
    animateZombieRoutine(position, time) {
        let actualX = this.x;
        this.game.add.tween(this)
            .to({
                x: position
            }, time, Phaser.Easing.Linear.None, true)
            .onComplete.add(() => {
                if (this.isAlive) {
                    return this.__swapIdleAnimation()
                        .then(() => this.animateZombieRoutine(actualX, time));
                }
            }, this);
    }
    onKilled() {
        let animation = this.getAttackAnimationPosition();
        this.animations.play()
    }
    onAttack() {

    }
    __swapIdleAnimation() {
        return new Promise((resolve) => {
            if (this.getIdleAnimationMove() === 'leftIdle') {
                resolve();
                this.isLookingAt = 'right';
                return this.animations.play('rightIdle');
            }
            resolve();
            this.isLookingAt = 'left';
            return this.animations.play('leftIdle');
        });
    }

}
