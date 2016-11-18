import BasePlayer from '../common/basePlayer.js';
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
    if(this.totalLifes === 0) {
      this.body.collideWorldBounds = false;
      this.body.moves = false;
      this.visible = false;
    }
  }
  incrementLife() {
    this.totalLifes++;
  }
  initializeHearts(config) {
    this.heartArray = [];
    Array.from(new Array(config.totalLifes)).map(() => {
      let heart = new Heart(this.game, config);
      config.x += config.offset;
      this.heartArray.push(heart);
    });
  }
  hookButtonEvents() {
    this.__leftPress = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.__leftPress.onDown.add(() => this.onLeftPress(), this);
    this.__leftPress.onUp.add(() => this.onStop(), this);
    this.__RightPress = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.__RightPress.onDown.add(() => this.onRightPress(), this);
    this.__RightPress.onUp.add(() => this.onStop(), this);
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
  onStop() {
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
