import Utils from './../common/utils.js';

export default class Bonus extends Phaser.Sprite {
  constructor(game, config, guy, hearts) {
    super(game, config.x, config.y, config.spriteSheet, config.frameName);
    this.game = game;
    this.guy = guy;
    this.hearts = hearts;
    this.scale.setTo(4, 4);
    this.isActive = true;
    this.bringToTop();
    this._initializeLifeTime()
      ._hookCollideEvents();
  }
  _initializeLifeTime() {
    this.lifeTime = this.game.time.events.add(Phaser.Timer.SECOND * 3, () => this._animateBlink(), this);
    return this;
  }
  _animateBlink() {
      return Array.from(new Array(19))
        .reduce((previous) =>
          previous
          .then(() => {
            return new Promise((resolve) => {
              if (!this.isCollided) {
                this.visible = !this.visible;
                Utils.waitSomeSecondsPromiser(this.game, 0.25, resolve, this);
              }
            });
          }, this), Promise.resolve())
        .then(() => this._removeBonusEvents()
          ._disable());
    }
    /**
     * @function private function that removes the timer event from the object
     */
  _removeBonusEvents() {
    this.visible = false;
    this.game.time.events.remove(this.lifeTime);
    return this;
  }
  _hookCollideEvents() {
    return new Promise((resolve) => Utils.waitSomeSecondsPromiser(this.game, 0.5, resolve, this))
      .then(() => {
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(() => this._onCollisionCallback(), this);
      });
  }
  _onCollisionCallback() {
    if (this.isActive) {
      this.game.effects.play('item', 4);
      this.isCollided = true;
      let heart = this.hearts.filter(heart => heart.frameName === 'heart')[0];
      if (heart !== undefined) {
        heart.on();
        this.guy.incrementLife();
        this.isActive = false;
        this._removeBonusEvents();
        this.destroy();
      }
    }
  }
  _disable() {
    this.isActive = false;
  }
  enablePhysics() {
    this.anchor.setTo(0, 0);
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    return this;
  }
  enableColliders() {
    this.body.collideWorldBounds = true;
    this.body.checkCollision.down = false;
    return this;
  }

}
