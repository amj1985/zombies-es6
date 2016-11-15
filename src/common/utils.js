/**
 * A.M: This class contains the utils that we will use in this tutorial game.
 * @class
 */
export default class Utils {
    static waitSomeSecondsPromiser(game, time, resolve, callbackContext) {
        game.time.events.add(Phaser.Timer.SECOND * time, () => resolve(), this);
    }
}
