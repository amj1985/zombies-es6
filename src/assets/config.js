//import Atlases from '../config/atlases/atlases.js';
//import Sprites from '../config/sprite/sprite.js';
/**
 * A.M: This function contains the base config of the game.
 * @function
 */
export default function() {
  return {
    atlases : require('../config/atlases/atlases.js')(),
    sprites : require('../config/sprite/sprite.js')()
 };
}
