import StartScene from '../../modules/startScene/startScene.js';
import Config from '../../modules/startScene/config.js';

class SceneLoader extends Phaser.State {
    /**
     * A.M: This function overrides the parent state function => preload.
     * @override
     */
    preload() {
        this._initializeConfig()
            ._initializeSplashScreen();
    }
    _initializeConfig() {
        this.config = new Config();
        return this;
    }
    _initializeSplashScreen() {
        let startScene = new StartScene(this.game);
    }

}
export default SceneLoader;
