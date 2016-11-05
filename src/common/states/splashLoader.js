import SplashScreen from '../../modules/splashScreen/splashScreen.js';
import Config from '../../modules/splashScreen/config.js';

class SplashLoader extends Phaser.State {
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
        this.splashScreen = new SplashScreen(this.game);
    }

}
export default SplashLoader;
