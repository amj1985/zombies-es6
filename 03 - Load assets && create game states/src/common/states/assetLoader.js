import Config from '../../assets/index.js';

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
   * A.M: This function overrides the parent state function => create.
   * @override
   */
  create() {
    this.game.state.start("Scene");
  }

  _initializeConfig() {
    this.config = new Config();
    return this;
  }
  _loadAtlases() {
    for (let atlasName in this.config.atlases) {
      const atlas = this.config.atlases[atlasName];
      this.game.load.atlas(atlasName, atlas.url, null, atlas.data, atlas.format);
    }
    return this;
  }
  _loadSprites() {
    for (let spriteName in this.config.sprites) {
      const sprite = this.config.sprites[spriteName];
      this.game.load.image(spriteName, sprite.url, sprite.overwrite);
    }
    return this;
  }
  _loadAudioSprites() {
    return new Promise((resolve) => {
      for (let audioSpriteName in this.config.audioSprites) {
        const audiosprite = this.config.audioSprites[audioSpriteName];
        this.game.load.audiosprite(audioSpriteName, audiosprite.urls, audiosprite.data);
      }
      this.game.load.onLoadComplete.add(() => {
        const effects = this.game.add.audioSprite('effects');
        this.game.effects = effects;
        const music = this.game.add.audioSprite('music');
        this.game.music = music;
        resolve();
      }, this);
    });
  }
}
export default AssetLoader;
