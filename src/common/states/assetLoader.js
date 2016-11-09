import Config from '../../assets/config.js';

class AssetLoader extends Phaser.State {
    /**
     * A.M: This function overrides the parent state function => preload.
     * @override
     */
    preload() {
            // TODO loadSounds
            this.__initializeConfig()
                .__loadAtlases()
                .__loadSprites();
    }
    /**
     * A.M: This function overrides the parent state function => preload.
     * @override
     */
    create() {
        this.game.state.start("Scene");
    }

    __initializeConfig() {
        this.config = Object.assign({}, new Config());
        return this;
    }
    __loadAtlases() {
        for (let atlasName in this.config.atlases) {
            let atlas = this.config.atlases[atlasName];
            this.game.load.atlas(atlasName, atlas.url, null, atlas.data, atlas.format);
        }
        return this;
    }
    __loadSprites() {
        for (let spriteName in this.config.sprites) {
            let sprite = this.config.sprites[spriteName];
            this.game.load.image(spriteName, sprite.url, sprite.overwrite);
        }
        return this;
    }

}
export default AssetLoader;
