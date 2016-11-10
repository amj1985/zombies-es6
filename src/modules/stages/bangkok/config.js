export default function () {
    return {
        background: 'bangkok',
        blackMask: 'transitionBackground',
        timeout: 10,
        textInfo: {
            textStage: 'STAGE 1 BANGKOK',
            startText: 'START !!',
            endStage: 'STAGE 1 SUCCESS !!',
            gameOver: 'GAME OVER !!',
            y: 100,
            style: {
                font: '60px Karmatic Arcade',
                strokeThickness: 1,
                stroke: '#210474',
                fill: '#ffffff'
            }
        },
        hearts: {
            totalLifes: 8,
            x: 20,
            y: 20,
            offset: 40,
            spriteSheet: 'hearts',
            frameName: 'heart-on'
        },
        explosion: {
            x: -1000,
            y: -1000,
            spriteSheet: 'explosion',
            frameName: null
        },
        guy: {
            x: -80,
            y: 152,
            offsetX: 100,
            spriteSheet: 'scavenger',
            frameName: 'scavenger4'
        },
        zombies: [{
            x: 720,
            y: 500,
            time: 2000,
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 420
            }
        }, {
            x: 1100,
            y: 750,
            time: 2000,
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 800
            }
        }, {
            x: 1450,
            y: 500,
            time: 2000,
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 1150
            }
        }, {
            x: 1820,
            y: 250,
            time: 2000,
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 1520
            }
        }, {
            x: 1820,
            y: 1000,
            time: 7000,
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 0
            }
        }],
        platforms: [{
            x: -50,
            y: 250,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }, {
            x: 400,
            y: 500,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }, {
            x: 750,
            y: 750,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }, {
            x: 1100,
            y: 500,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }, {
            x: 1500,
            y: 250,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }]
    };
}
