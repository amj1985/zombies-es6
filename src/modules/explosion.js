

export default class Explosion extends Phaser.Sprite {
  constructor(game, config){
    super(game, config.x, config.y, config.spriteSheet, config.frameName);
    this.scale.setTo(2,2);
  }
  registerAnimations(animations) {
      animations.map((animation) => {
          this.animations.add(animation.name, animation.frames, animation.frameRate, animation.loop, animation.useNumericIndex);
      });
      return this;
  }
  playBoomAnimation(x, y){
    this.x = x - 20;
    this.y = y - 40;
    this.animations.play('explosion');
  }
}
