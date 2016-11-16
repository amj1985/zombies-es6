import BasePlayer from './basePlayer.js';
import Animations from '../config/animations.js';
import Heart from './heart.js';

export default class Guy extends BasePlayer {
  constructor(game, config, connectionId) {
    super(game, config.x, config.y, config.spriteSheet, config.frameName);
    this.__registerAnimations()
      .__playBaseAnimation();
    this.connectionId = connectionId;
    this.isAttacking = false;
    this.totalLifes = 8;
    this.keyEvents = []
  }
  __registerAnimations() {
    super.registerAnimations(new Animations().guy);
    return this;
  }
  __playBaseAnimation() {
    this.animations.play('rightIdle');
  }
  reduceLife() {
    this.totalLifes--;
  }
  incrementLife() {
    this.totalLifes++;
  }
  initializeHearts(config) {
  //  this.heartArray = this.add();
  }
  hookButtonEvents() {
    this.__leftPress = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.__leftPress.onDown.add(() => this.onLeftPress(), this);
    this.__leftPress.onUp.add(() => this.__onStop(), this);
    this.__RightPress = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.__RightPress.onDown.add(() => this.onRightPress(), this);
    this.__RightPress.onUp.add(() => this.__onStop(), this);
    this.__upPress = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.__upPress.onDown.add(() => this.onUpPress(), this);
    this.__onSpacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.__onSpacePress.onDown.add(() => this.onAttack(), this);
    this.keyEvents = Object.assign([], this.__leftPress, this.__RightPress, this.__upPress, this.__onSpacePress);

  }
  onLeftPress() {
    this.isLookingAt = 'left';
    this.body.velocity.x = -250;
    this.animations.play('leftIdle');
  }
  onRightPress() {
    this.isLookingAt = 'right';
    this.body.velocity.x = 250;
    this.animations.play('rightIdle');

  }
  __onStop() {
    this.body.velocity.x = 0;
  }
  onUpPress() {
    if (this.body.touching.down && this.hitPlatfrom) this.body.velocity.y = -1200;
  }
  onAttack() {
    let randomSound = `${this.key}_${this.game.rnd.integerInRange(1, 5)}`;
    this.game.effects.play(randomSound);
    this.isAttacking = true;
    super.onAttack();
  }
}
