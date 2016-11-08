import Phaser from 'phaser';

export default class BasePlayer extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        this.isAlive = true;
    }
    initializePhysics() {
        if (this.key === 'zombie') this.body.moves = false;
        this.__enablePhysics()
            .__enableBounces()
            .__enableColliders()
            .__enableGravity();
    }
    registerAnimations(animations) {
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
    getIdleAnimationMove() {
        return this.isLookingAt === 'left' ? 'leftIdle' : 'rightIdle';
    }
    getAttackAnimationPosition() {
        return this.isLookingAt === 'left' ? 'leftAttack' : 'rightAttack';
    }
    moveToPosition(offset) {
        return new Promise((resolve) => {
            if (this.key === 'zombie') {
                this.game.add.tween(this)
                    .to({
                        y: this.y - offset
                    }, 2000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(() => {
                       resolve();
                    }, this);
            } else {
                this.game.add.tween(this)
                    .to({
                        x: offset
                    }, 2000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(() => resolve(), this);
            }
        });
    }
    onAttack(attackAnimation, moveAnimation) {
      let animation = this.getAttackAnimationPosition();
      this.animations.play(animation)
      .onComplete.add(() => {
        this.isAttacking = false;
        let moveAnimation = this.getIdleAnimationMove();
        this.animations.play(moveAnimation);
      });
    }
    __onDie() {

    }

}
