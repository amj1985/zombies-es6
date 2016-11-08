import Phaser from 'phaser';

export default class BasePlayer extends Phaser.Sprite{
    constructor(game, x, y, key, frame){
      super(game, x , y, key, frame);
      this.__enablePhysics()
      .__enableBounces()
      .__enableColliders()
      .__enableGravity();
    }
    registerAnimations(animations){
      animations.map((animation) => {
          this.animations.add(animation.name, animation.frames, animation.frameRate, animation.loop, animation.useNumericIndex);
      });
      return this;
    }
    __enablePhysics() {
      this.anchor.setTo(0, 0);
      this.game.physics.arcade.enable(this);
      return this;
    }
    __enableBounces() {
      this.body.bounce.y = 0.2;
      return this;
    }
    __enableColliders() {
      this.body.collideWorldBounds = true;
      return this;
    }
    __enableGravity() {
      this.body.gravity.y = 2000;
      return this;
    }
    __moveTo(direction){

    }
    __attack(){

    }
    __onDie(){

    }

}
