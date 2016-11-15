export default class Blood extends Phaser.Sprite {
  constructor(game, config) {
    super(game, config.x, config.y, config.spriteName);
    this.game = game;
  }
  animateBloodIn() {
    return new Promise((resolve) => {
      this.bringToTop();
      this.game.add.tween(this)
        .to({
          alpha: 1
        }, 250, Phaser.Easing.Linear.None, true)
        .onComplete.add(() => {
          resolve();
        }, this);
    });
  }
  animateBloodOut() {
    return new Promise((resolve) => {
      this.bringToTop();
      this.game.add.tween(this)
        .to({
          alpha: 0
        }, 250, Phaser.Easing.Linear.None, true)
        .onComplete.add(() => {
          resolve();
        }, this);
    });
  }
}
