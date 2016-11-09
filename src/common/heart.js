export default class Heart extends Phaser.Sprite {
  constructor(game, config){
    super(game, config.x, config.y, config.spriteSheet, config.frameName);
  }
  off(){
    this.frameName = 'heart';
  }
  on(){
    this.frameName = 'heart-on'
  }
}
