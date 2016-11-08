import Phaser from 'phaser';
import Guy from './guy.js';
import Zombie from './zombie.js';

export default class BaseStage extends Phaser.Group {
    constructor(game) {
        super(game);
        this.game = game;
        this.zombies = [];
        this.groundPositions = [0, 750, 1500];
        this.__initialize();
    }
    __initialize() {
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        return this;
    }
    initializeBlackMask(backgroundName) {
        this.blackMask = this.add(new Phaser.Sprite(this.game, 0, 0, backgroundName));
        this.blackMask.alpha = 1;
        this.blackMask.visible = false;
        return this;
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
    initializeGround() {
        this.groundPositions.map((position) => {
            let ground = this.platforms.create(position, this.game.world.height - 64, 'platforms', 'Platform4');
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
    update() {
        this.game.physics.arcade.collide(this.guy, this.platforms);
        this.game.physics.arcade.collide(this.zombies, this.platforms);
        this.game.physics.arcade.collide(this.guy, this.zombies);
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
