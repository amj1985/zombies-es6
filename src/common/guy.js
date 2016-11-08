import BasePlayer from './basePlayer.js';
import Animations from '../config/animations.js';

export default class Guy extends BasePlayer {
    constructor(game, config) {
        super(game, config.x, config.y, config.spriteSheet, config.frameName);
        this.__registerAnimations()
            .__playBaseAnimation();
    }
    __registerAnimations() {
      super.registerAnimations(new Animations().guy);
      return this;
    }
    __playBaseAnimation() {
       this.animations.play('rightIdle');
    }
    hookButtonEvents() {
        this.__leftPress = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.__leftPress.onDown.add(() => this.__onLeftPress(), this);
        this.__leftPress.onUp.add(() => this.__onStop(), this);
        this.__RightPress = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.__RightPress.onDown.add(() => this.__onRightPress(), this);
        this.__RightPress.onUp.add(() => this.__onStop(), this);
        this.__upPress = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.__upPress.onDown.add(() => this.__onUpPress(), this);
        this.__onSpacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.__onSpacePress.onDown.add(() => this.__onAttack(), this);
    }
    __onLeftPress() {
        this.isLookingAt = 'left';
        this.body.velocity.x = -250;
        this.animations.play('leftIdle');

    }
    __onRightPress() {
        this.isLookingAt = 'right';
        this.body.velocity.x = 250;
        this.animations.play('rightIdle');
    }
    __onStop() {
        this.body.velocity.x = 0;
    }
    __onUpPress() {
        console.log('up pressed');
    }
    __onAttack() {
      let animation = this.isLookingAt === 'left' ? 'leftAttack' : 'rightAttack';
      this.animations.play(animation);
    }
}
