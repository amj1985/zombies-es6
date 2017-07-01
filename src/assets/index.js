export default function () {
    return {
        atlases: require('../config/atlases/atlases.js')(),
        sprites: require('../config/sprite/sprite.js')(),
        audioSprites: require('../config/audiosprites/index.js')()
    };
}
