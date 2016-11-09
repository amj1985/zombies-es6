import StartScene from '../../modules/startScene/startScene.js';
import Config from '../../modules/startScene/config.js';

class SceneLoader extends Phaser.State {
    /**
     * A.M: This function overrides the parent state function => preload.
     * @override
     */
    preload() {
        this.__initializeConfig()
            .__initializeSplashScreen();
    }
    __initializeConfig() {
        this.config = Object.assign({}, new Config());
        return this;
    }
    __initializeSplashScreen() {
        let startScene = new StartScene(this.game);
    }

}
export default SceneLoader;
