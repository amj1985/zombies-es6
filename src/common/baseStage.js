import Phaser from 'phaser';
import Guy from './guy.js';
import Zombie from './zombie.js';
import Explosion from './explosion.js';
import Heart from './heart.js';
import Utils from './utils.js';
import Blood from './blood.js';
import Bonus from './bonus.js';

export default class BaseStage extends Phaser.Group {
  constructor(game, gameResolver, gameRejector, stageName, hub, connectionIds = undefined) {
      super(game);
      this.resolver = gameResolver;
      this.rejector = gameRejector;
      this.hub = hub;
      this.connectionIds = connectionIds;
      this.game = game;
      this.players = [];
      this.zombies = [];
      this.gamePlatforms = [];
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
      this.players.map((guy) => {
        guy.initializeHearts(config);
      })
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
     * @function protected function that initialize the blood area that appears when zombie hits you
     */
  __initializeBloodArea(bloodConfig) {
      this.bloodArea = this.add(new Blood(this.game, bloodConfig));
      this.bloodArea.alpha = 0;
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
  __animatePlayerIn(config) {
    return new Promise((resolve) => {
      Promise.all(this.players.map((guy, index) => {
          return guy.moveToPosition(config[index].offsetX);
          return this;
        })).then(() => resolve());
    });
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
          .then(() => Utils.waitSomeSecondsPromiser(this.game, 1, resolve, this));
      });
    }
    /**
     * @function protected method that iterate over the platform array and then tween them
     */
  __animatePlatforms(offsetX) {
      this.gamePlatforms.shift();
      this.gamePlatforms.pop();
      return new Promise((resolve) => {
        return Promise.all(this.gamePlatforms.map((platform) => {
          return this._tweenPlatform(platform, 300, platform.velocity);
        })).then(() => resolve());
      });
    }
    /**
     * @function protected method that move the platforms left to right in loop
     */
  _tweenPlatform(platform, position, time) {
      let actualX = platform.x;
      this.game.add.tween(platform)
        .to({
          x: position,
        }, time, Phaser.Easing.Linear.None, true)
        .onComplete.add(() => {
          this._tweenPlatform(platform, actualX, time);
        }, this);
    }
    /**
     * @function private function that concat char to a title;
     */
  _incrementTitle() {
      return new Promise((resolve) => {
        this.mainText.visible = true;
        this.mainText.setText(this.mainText.text + this.textSteps[0]);
        this.textSteps.splice(0, 1);
        Utils.waitSomeSecondsPromiser(this.game, 0.15, resolve, this);
      });
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
    if (this.players[0].totalLifes !== 0 || this.players[1].totalLifes !== 0) {
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
  onLeftPress(connectionId) {
    let player = this.players.filter(element => element.connectionId == connectionId)[0];
    player.onLeftPress();
  }
  onRightPress(connectionId) {
    let player = this.players.filter(element => element.connectionId == connectionId)[0];
    player.onRightPress();
  }
  onUpPress(connectionId) {
    let player = this.players.filter(element => element.connectionId == connectionId)[0];
    player.onUpPress();
  }
  onAttack(connectionId) {
    let player = this.players.filter(element => element.connectionId == connectionId)[0];
    player.onAttack();
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
        this.gamePlatforms.push(newPlatform);
        return this;
      });
      return this;
    }
    /**
     * @function protected method that creates a new scavenger
     */
  __initializePlayers(players) {
      if(this.connectionIds === undefined){
        return this;
      }
      this.connectionIds.map((connectionId, index) => {
        let guy = this.add(new Guy(this.game, players[index], connectionId));
        guy.scale.setTo(3, 3);
        this.game.physics.arcade.enable(guy);
        this.players.push(guy);
        return this;
      });
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
    /**
     * @function private method that redufe a life by one when zombie hit scanveger or timeout callback is called
     */
  _reduceLifeByOne() {
      if (this.guy.totalLifes > 0) {
        this.game.effects.play('heartBeat', 2);
        let hearts = this.heartArray.filter(heart => heart.frameName === 'heart-on');
        let heart = hearts[hearts.length - 1];
        heart.off();
        this.guy.reduceLife();
      }
    }
    /**
     * @function private method (callback) being called when guy collide a zombie
     */
  _onCollisionCallback(zombie) {
      if (this.players[0].isAttacking || this.players[1].isAttacking) this._processGuyAttack(zombie);
      else this._processZombieAttack(zombie);
    }
    /**
     * @function private method that reset the scene
     */
  _reset() {
      this.zombies.map((zombie) => zombie.destroy());
    }
    /**
     * @function private method that intiialize fade in and gameover layout
     */
  _endGame(message) {
      this._reset();
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
          .then(() => Utils.waitSomeSecondsPromiser(this.game, 1, resolve, this));
      });
    }
    /**
     * @function protected method extends from Phaser.Group that extends from Phaser.State and it's being called every frame
     */
  update() {
      this.players.map((guy) => {
        guy.hitPlatfrom = this.game.physics.arcade.collide(guy, this.platforms);
        this.game.physics.arcade.collide(guy, this.zombies);
        if (this.bonusItem) {
          this.game.physics.arcade.collide(guy, this.bonusItem);
        }
      });
      this.game.physics.arcade.collide(this.zombies, this.platforms);
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
    /**
     * @function private method that initialize the zombies
     */
  _createBonusItem(zombie) {
      let baseName = 'Food_';
      let config = {
        x: zombie.x,
        y: zombie.y,
        spriteSheet: 'bonus',
        frameName: `${baseName}${this.game.rnd.integerInRange(1, 64)}`
      };
      this.bonusItem = this.add(new Bonus(this.game, config, this.guy, this.heartArray));
      this.bonusItem.enablePhysics()
        .enableColliders();
    }
    /**
     * @function private method that handle scavenger attack
     */
  _processGuyAttack(zombie) {
      this.boomExplosion.playBoomAnimation(zombie.x, zombie.y);
      zombie.destroy();
      if (this.game.rnd.integerInRange(1, 10) > this.config.itemChance && !this.bonusItem && this.guy.totalLifes !== 8) {
        this._createBonusItem(zombie);
      } else if (this.bonusItem && !this.bonusItem.isActive) {
        this._createBonusItem(zombie);
      }
      let index = this.zombies.indexOf(zombie);
      this.zombies.splice(index, 1);
      if (this.zombies.length === 0) {
        this._animateFadeIn()
          .then(() => this._endGame(this.config.textInfo.endStage))
          .then(() => {
            this.mainText.visible = true;
            this.visible = false;
            this.game.time.events.remove(this.countDown);
            this.resolver();
          });
      }
    }
    /**
     * @function private method that handle zombie attack
     */
  _processZombieAttack(zombie) {
    if (!zombie.isAttacking) {
      zombie.attack();
      this.bloodArea.animateBloodIn()
        .then(() => this.bloodArea.animateBloodOut())
        .then(() => {
          this._reduceLifeByOne();
          this.game.time.events.remove(this.countDown);
          this.__initializeCountDown();
          if (this.guy.totalLifes === 0 && this.isActive) {
            this.isActive = false;
            this.game.time.events.remove(this.countDown);
            this._animateFadeIn()
              .then(() => this._endGame(this.config.textInfo.gameOver))
              .then(() => {
                this.visible = false;
                this.rejector();
              });
          }
        });
    }
  }
}
