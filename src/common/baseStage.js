import Phaser from 'phaser';
import Guy from './guy.js';
import Zombie from './zombie.js';
import Explosion from './explosion.js';

export default class BaseStage extends Phaser.Group {
    constructor(game) {
        super(game);
        this.game = game;
        this.zombies = [];
        this.__initialize()
    }
    __initialize() {
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        return this;
    }
    initializeBoomExplosion(config, animations) {
        this.boomExplosion = this.add(new Explosion(this.game, config));
        this.boomExplosion.registerAnimations(animations);
        return this;
    }
    initializeBlackMask(backgroundName) {
        this.blackMask = this.add(new Phaser.Sprite(this.game, 0, 0, backgroundName));
        this.blackMask.alpha = 1;
        this.blackMask.visible = false;
        return this;
    }
    initializeTextAreas(textInfo) {
        this.textSteps = Object.assign([], textInfo.textStage);
        this.mainText = this.add(new Phaser.Text(this.game, this.game.world.centerX, textInfo.y, '', textInfo.style));
        this.mainText.anchor.setTo(0.5, 0.5);
        this.mainText.visible = false;
        return this;
    }
    animatePlayerIn(offsetX) {
        return this.guy.moveToPosition(offsetX);
    }
    animateZombiesIn(offsetY) {
        return new Promise((resolve) => {
            return Promise.all(this.zombies.map((zombie) => {
                return zombie.moveToPosition(offsetY);
            })).then(() => resolve());
        });
    }
    animateTextIntro() {
        return new Promise((resolve) => {
            return Array.from(new Array(this.textSteps.length))
                .reduce((previous) =>
                    previous
                    .then(() => this.__incrementTitle(), this), Promise.resolve())
                .then(() => this.mainText.setText('START !!'))
                .then(() => this.__waitSomeSecondsPromiser(1, resolve));
        });
    }
    __incrementTitle() {
        return new Promise((resolve) => {
            this.mainText.visible = true;
            this.mainText.setText(this.mainText.text + this.textSteps[0]);
            this.textSteps.splice(0, 1);
            this.__waitSomeSecondsPromiser(0.15, resolve);
        });
    }
    __waitSomeSecondsPromiser(time, resolve) {
        this.game.time.events.add(Phaser.Timer.SECOND * time, () => resolve(), this);
    }
    animateFadeOut() {
        return new Promise((resolve) => {
            this.game.add.tween(this.blackMask)
                .to({
                    alpha: 0
                }, 2000, Phaser.Easing.Linear.None, true)
                .onComplete.add(() => resolve(), this);
        });
    }
    animateFadeIn() {
        return new Promise((resolve) => {
            this.game.add.tween(this.blackMask)
                .to({
                    alpha: 1
                }, 2000, Phaser.Easing.Linear.None, true)
                .onComplete.add(() => resolve(), this);
        });

    }
    initializeBackground(backgroundName) {
        this.backGround = this.add(new Phaser.Sprite(this.game, 0, 0, backgroundName));
        return this;
    }
    initializeGround(groundPositions) {
        groundPositions.map((position) => {
            let ground = this.platforms.create(position, this.game.world.height - 80, 'platforms', 'Platform4');
            ground.body.immovable = true
            ground.scale.setTo(2, 2);
            return this;
        });
        return this;
    }
    initializeText(textInfo) {
        this.textInfo = new Phaser.Text(this.game, textInfo.x, textInfo.y, textInfo.text, textInfo.style);
    }
    initializePlatforms(platforms) {
        platforms.map((platform) => {
            let newPlatform = this.platforms.create(platform.x, platform.y, platform.spriteSheet, platform.frame);
            newPlatform.body.immovable = true;
            newPlatform.scale.setTo(1, 1);
            return this;
        });
        return this;
    }
    initializeGuy(guyConfig) {
        this.guy = this.add(new Guy(this.game, this.config.guy));
        this.guy.scale.setTo(3, 3);
        this.game.physics.arcade.enable(this.guy);
        return this;
    }
    hookColliderEvents(guy, zombies) {
        this.zombies.map((zombie) => {
            zombie.body.onCollide = new Phaser.Signal();
            zombie.body.onCollide.add(() => this.onCollisionCallback(zombie), this);
        });
    }
    onCollisionCallback(zombie) {
        if (this.guy.isAttacking) {
            this.boomExplosion.playBoomAnimation(zombie.x, zombie.y);
            zombie.destroy();
        } else {
            zombie.attack();
        }
    }
    update() {
        this.guy.hitPlatfrom = this.game.physics.arcade.collide(this.guy, this.platforms);
        this.game.physics.arcade.collide(this.zombies, this.platforms);
        this.game.physics.arcade.collide(this.guy, this.zombies);
    }
    animateZombiesRoutine(zombies, config) {
        zombies.map((zombie, index) => zombie.animateZombieRoutine(config[index].tween.x, config[index].time));
    }
    initializeZombies(zombies) {
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

}
