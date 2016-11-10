import Phaser from 'phaser';
import Guy from './guy.js';
import Zombie from './zombie.js';
import Explosion from './explosion.js';
import Heart from './heart.js';

export default class BaseStage extends Phaser.Group {
    constructor(game, gameResolver, gameRejector, stageName) {
            super(game);
            this.resolver = gameResolver;
            this.rejector = gameRejector;
            this.game = game;
            this.zombies = [];
            this.totalLifes = 8;
            this.stageName = stageName;
            this.isActive = true;
            this._initialize();
        }
        /**
         * @function private function that enable body on the grounds & platforms
         */
    _initialize() {
            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;
            this.game.music.play(this.stageName, 0.5);
            return this;
        }
        /**
         * @function protected function that initialize hearts
         */
    __initializeHearts(config) {
            this.heartArray = [];
            Array.from(new Array(config.totalLifes)).map(() => {
                let heart = this.add(new Heart(this.game, config));
                config.x += config.offset;
                this.heartArray.push(heart);
            });
        }
        /**
         * @function protected function that initialize boom Explosion
         */
    __initializeBoomExplosion(config, animations) {
            this.boomExplosion = this.add(new Explosion(this.game, config));
            this.boomExplosion.registerAnimations(animations);
            return this;
        }
        /**
         * @function protected function that initialize the blackMask for fadeIn -- fadeOut effect purpose
         */
    __initializeBlackMask(backgroundName) {
            this.add(this.platforms);
            this.blackMask = this.add(new Phaser.Sprite(this.game, 0, 0, backgroundName));
            this.blackMask.alpha = 0;
            this.blackMask.visible = true;
            return this;
        }
        /**
         * @function protected function that initialize the blackMask for fadeIn effect purpose
         */
    __initializeTextAreas(textInfo) {
            this.textSteps = Object.assign([], textInfo.textStage);
            this.mainText = this.add(new Phaser.Text(this.game, this.game.world.centerX, textInfo.y, '', textInfo.style));
            this.mainText.anchor.setTo(0.5, 0.5);
            this.mainText.visible = false;
            return this;
        }
        /**
         * @function protected function that animate guy to the start point
         */
    __animatePlayerIn(offsetX) {
            return this.guy.moveToPosition(offsetX);
        }
        /**
         * @function protected function that animate zombies up from the ground
         */
    __animateZombiesIn(offsetY) {
            return new Promise((resolve) => {
                return Promise.all(this.zombies.map((zombie) => {
                    return zombie.moveToPosition(offsetY);
                })).then(() => resolve());
            });
        }
        /**
         * @function protected function that animate the textIntro character by character
         */
    __animateText(finalText) {

            return new Promise((resolve) => {
                return Array.from(new Array(this.textSteps.length))
                    .reduce((previous) =>
                        previous
                        .then(() => this._incrementTitle(), this), Promise.resolve())
                    .then(() => this.mainText.setText(finalText))
                    .then(() => this.__waitSomeSecondsPromiser(1, resolve));
            });
        }
        /**
         * @function private function that concat char to a title;
         */
    _incrementTitle() {
            return new Promise((resolve) => {
                this.mainText.visible = true;
                this.mainText.setText(this.mainText.text + this.textSteps[0]);
                this.textSteps.splice(0, 1);
                this.__waitSomeSecondsPromiser(0.15, resolve);
            });
        }
        /**
         * @function protected method that delay the game (asyncronous)
         */
    __waitSomeSecondsPromiser(time, resolve) {
            this.game.time.events.add(Phaser.Timer.SECOND * time, () => resolve(), this);
        }
        /**
         * @function private method that delay the game (asyncronous)
         */
    _animateFadeOut() {
            return new Promise((resolve) => {
                this.game.add.tween(this.blackMask)
                    .to({
                        alpha: 0
                    }, 2000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(() => resolve(), this);
            });
        }
        /**
         * @function private method that animate blackMask from alpha: 0 to alpha: 1 the game (asyncronous)
         */
    _animateFadeIn() {
            return new Promise((resolve) => {
                this.blackMask.bringToTop();
                this.game.add.tween(this.blackMask)
                    .to({
                        alpha: 1
                    }, 2000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(() => {
                        this.game.music.stop();
                        resolve();
                    }, this);
            });
        }
        /**
         * @function protected method that initialize a new countdown
         */
    __initializeCountDown(time) {
            this.stageTimeout = time !== undefined ? time : this.stageTimeout;
            return new Promise((resolve) => {
                this.countDown = this.game.time.events
                    .loop(Phaser.Timer.SECOND * this.stageTimeout, () =>
                        this._onCountDownCallback(), this);
                resolve();
            })
            return this;
        }
        /**
         * @function private method (callback) that reduce the totalLifes by one when is called
         */
    _onCountDownCallback() {
            if (this.totalLifes !== 0) {
                this._reduceLifeByOne();
            } else if (this.isActive === true) {
                this.isActive == false;
                this._animateFadeIn()
                    .then(() => this._endGame(this.config.textInfo.gameOver))
                    .then(() => {
                        this.visible = false
                        this.rejector();
                    });
            }
        }
        /**
         * @function protected method that creates a new background
         */
    __initializeBackground(backgroundName) {
            this.backGround = this.add(new Phaser.Sprite(this.game, 0, 0, backgroundName));
            return this;
        }
        /**
         * @function protected method that creates a new ground
         */
    __initializeGround(groundPositions) {
            groundPositions.map((position) => {
                let ground = this.platforms.create(position, this.game.world.height - 80, 'platforms', 'Platform4');
                ground.body.immovable = true
                ground.scale.setTo(2, 2);
                return this;
            });
            return this;
        }
        /**
         * @function protected method that creates a new textTitle
         */
    __initializeText(textInfo) {
            this.textInfo = new Phaser.Text(this.game, textInfo.x, textInfo.y, textInfo.text, textInfo.style);
        }
        /**
         * @function protected method that creates a new background
         */
    __initializePlatforms(platforms) {
            platforms.map((platform) => {
                let newPlatform = this.platforms.create(platform.x, platform.y, platform.spriteSheet, platform.frame);
                newPlatform.body.immovable = true;
                newPlatform.scale.setTo(platform.scaleX, platform.scaleY);
                return this;
            });
            return this;
        }
        /**
         * @function protected method that creates a new scavenger
         */
    __initializeGuy(guyConfig) {
            this.guy = this.add(new Guy(this.game, this.config.guy));
            this.guy.scale.setTo(3, 3);
            this.game.physics.arcade.enable(this.guy);
            return this;
        }
        /**
         * @function protected method that hook an eventHandlers to the zombies collision purpose
         */
    __hookColliderEvents(guy, zombies) {
        this.zombies.map((zombie) => {
            zombie.body.onCollide = new Phaser.Signal();
            zombie.body.onCollide.add(() => this._onCollisionCallback(zombie), this);
        });
    }
    _reduceLifeByOne() {
            if (this.totalLifes > 0) {
                this.game.effects.play('heartBeat', 4);
                this.heartArray[this.totalLifes - 1].off();
                this.totalLifes--;
            }
        }
        /**
         * @function private method (callback) being called when guy collide a zombie
         */
    _onCollisionCallback(zombie) {
        if (this.guy.isAttacking) this._processGuyAttack(zombie);
        else this._processZombieAttack(zombie);
    }
    _endGame(message) {
            return new Promise((resolve) => {
                if (message === 'GAME OVER !!') {
                    this.game.music.play('gameOver');
                }
                this.config.textInfo.startText = '';
                this.bringToTop(this.mainText);
                this.mainText.setText('');
                this.mainText.style.fill = '#ffffff';
                this.mainText.y = this.game.world.centerY;
                this.mainText.visible = true;
                this.textSteps = Object.assign([], message);
                this.__animateText(message)
                    .then(() => this.__waitSomeSecondsPromiser(1, resolve));
            });
        }
        /**
         * @function protected method extends from Phaser.Group that extends from Phaser.State and it's being called every frame
         */
    update() {
            this.guy.hitPlatfrom = this.game.physics.arcade.collide(this.guy, this.platforms);
            this.game.physics.arcade.collide(this.zombies, this.platforms);
            this.game.physics.arcade.collide(this.guy, this.zombies);
        }
        /**
         * @function protected method that animate zombies between platforms
         */
    __animateZombiesRoutine(zombies, config) {
            zombies.map((zombie, index) => zombie.animateZombieRoutine(config[index].tween.x, config[index].time));
        }
        /**
         * @function protected method that initialize the zombies
         */
    __initializeZombies(zombies) {
        zombies.map((element) => {
            let zombie = this.add(new Zombie(this.game, element));
            zombie.scale.setTo(3, 3);
            this.game.physics.arcade.enable(zombie);
            this.zombies.push(zombie);
            this.game.physics.arcade.enable(this.zombies);
            return this;
        });
        return this;
    }
    _processGuyAttack(zombie) {
        this.boomExplosion.playBoomAnimation(zombie.x, zombie.y);
        zombie.destroy();
        let index = this.zombies.indexOf(zombie);
        this.zombies.splice(index, 1);
        if (this.zombies.length === 0) {
            this._animateFadeIn()
                .then(() => this._endGame(this.config.textInfo.endStage))
                .then(() => {
                    this.mainText.visible = true;
                    this.visible = false;
                    this.resolver();
                });
        }
    }
    _processZombieAttack(zombie) {
        if (!zombie.isAttacking) {
            zombie.attack();
            this._reduceLifeByOne();
            this.game.time.events.remove(this.countDown);
            this.__initializeCountDown();
            if (this.totalLifes === 0) {
                if (this.isActive) {
                    this.isActive = false;
                    this._animateFadeIn()
                        .then(() => this._endGame(this.config.textInfo.gameOver))
                        .then(() => {
                            this.visible = false;
                            this.rejector();
                        });
                }
            }
        }
    }

}
