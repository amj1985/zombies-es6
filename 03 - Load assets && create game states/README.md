#### LOAD ASSETS && CREATE GAME STATES

 - Go to src/ and copy and paste the assets folder into src root folder
 - Go to src/ and copy and paste the config folder into src root folder
 - Go to src/assets/ and create and index.js I.E assets/index.js
 - Go to src/common/states and create assetLoader.js, gameLoader.js, sceneLoader.js

#### LOADING ASSETS - ASSETSLOADER.JS

 - Go to scr/common/states/assetsLoader.js
 - Import config(assets routes) from assets/index.js and override the parent preload() method then initialize your config I.E preload() { this.config = new Config }
 - Split the asset loading into 3 methods I.E _loadAtlases, _loadSprites, _loadAudioSprites;

 - Go to _loadAtlases function and create a for loop to iterate over config.atlases I.E for(let atlasName in this.config.atlases)
 - Get the atlasmap using the argument atlasName on the config.atlases object I.E const atlas = this.config.atlasses[atlasName];
 - Load the atlasmap into game object I.E this.game.load.atlas(atlasName, atlas.url, null, atlas.data, atlas.format);

 - Do the same in the _loadSprites function I.E this.game.load.image(spriteName, sprite.url, sprite.overwrite);
 - Create a new promise that will load the audioSprites I.E return new Promise((resolve) => { // TODO LOAD AUDIOSPRITES });
 - Repeat the last step loading the audiosprites I.E  this.game.load.audiosprite(audioSpriteName, audiosprite.urls, audiosprite.data);
 - hook the game.load.onLoadComplete callback I.E this.game.load.onLoadComplete.add(() => { // TODO EXTENDS this.game object }); I.E
        let effects = this.game.add.audioSprite('effects');
        this.game.effects = effects;
        let music = this.game.add.audioSprite('music');
        this.game.music = music;
 - resolve the promise

#### CALL STATES FROM GAME

- Go to scr/game.js
- import all the game references like Phaser and pixi && p2 for physics I.E import Phaser from 'phaser'; import 'pixi'; import 'p2'
- create a function to initialize states I.E _initializeStates() { // TODO Add the states that you have previously created } I.E this.state.add('Boot', gameLoader, false);
- start the boot state that references to gameLoader.js I.E this.state.start('Boot');

#### LOADING GAME

 - Go to src/common/states/gameLoader.js
 - override the method create
 - set scaleMode I.E this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 - start system arcade I.E this.game.physics.startSystem(Phaser.Physics.ARCADE);
 - set a backgroundColor on stage I.E this.game.stage.backgroundColor = '#cecece'
 - start the preload state that references to assetLoader.js I.E this.game.state.start('Preload');
