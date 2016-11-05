
class GameLoader extends Phaser.State {

    create(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.stage.backgroundColor = '#cecece';
      this.game.state.start("Preload");
    }

}
export default GameLoader;
