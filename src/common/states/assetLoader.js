import Config from '../../assets/config.js';

class AssetLoader extends Phaser.State {
    /**
     * A.M: This function overrides the parent state function => preload.
     * @override
     */
    preload() {
            // TODO loadSounds
            this._initializeConfig()
                ._loadAtlases()
                ._loadSprites()
                ._loadAudioSprites();

        }
        /**
         * A.M: This function overrides the parent state function => preload.
         * @override
         */
    create() {
        this.game.state.start("Scene");
    }

    _initializeConfig() {
        this.config = Object.assign({}, new Config());
        return this;
    }
    _loadAtlases() {
        for (let atlasName in this.config.atlases) {
            let atlas = this.config.atlases[atlasName];
            this.game.load.atlas(atlasName, atlas.url, null, atlas.data, atlas.format);
        }
        return this;
    }
    _loadSprites() {
        for (let spriteName in this.config.sprites) {
            let sprite = this.config.sprites[spriteName];
            this.game.load.image(spriteName, sprite.url, sprite.overwrite);
        }
        return this;
    }
    _loadAudioSprites() {
        return new Promise((resolve) => {
            for (let audioSpriteName in this.config.audioSprites) {
                let audiosprite = this.config.audioSprites[audioSpriteName];
                this.game.load.audiosprite(audioSpriteName, audiosprite.urls, audiosprite.data);
            }
            this.game.load.onLoadComplete.add(() => {
                let effects = this.game.add.audioSprite('effects');
                this.game.effects = effects;
                let music = this.game.add.audioSprite('music');
                this.game.music = music;
                resolve();
            }, this);
        });
        return this;

    }
}
export default AssetLoader;
