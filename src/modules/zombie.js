import BasePlayer from '../common/basePlayer.js';
import Animations from '../config/animations.js';

export default class Zombie extends BasePlayer {
  constructor(game, config) {
    super(game, config.x, config.y, config.spriteSheet, config.frameName);
    this.config = config;
    this.registerAnimations()
      .__playBaseAnimation();
  }
  registerAnimations() {
    super.registerAnimations(new Animations().zombie);
    return this;
  }
  __playBaseAnimation() {
    this.animations.play(this.config.animation);
  }
  attack() {
    this.isAttacking = true;
    let randomSound = `${this.key}_${this.game.rnd.integerInRange(1, 9)}`;
    this.game.effects.play(randomSound);
    this.game.time.events.add(Phaser.Timer.SECOND, () => this._resetAttack(), this);
    super.onAttack();
  }
  _resetAttack() {
    this.isAttacking = false;
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
  __swapIdleAnimation() {
    return new Promise((resolve) => {
      this.config.animation = this.config.animation === 'leftIdle' ? 'rightIdle' : 'leftIdle';
      this.isLookingAt = this.config.animation === 'leftIdle' ? 'right' : 'left';
      this.animations.play(this.config.animation);
      resolve();
    });
  }
}
