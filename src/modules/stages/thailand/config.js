export default function () {
    return {
        background: 'thailand',
        blackMask: 'transitionBackground',
        timeout: 9,
        textInfo: {
            textStage: 'STAGE 2 THAILAND',
            startText: 'START !!',
            endStage: 'STAGE 2 SUCCESS !!',
            gameOver: 'GAME OVER !!',
            y: 100,
            style: {
                font: '60px Karmatic Arcade',
                strokeThickness: 1,
                stroke: '#210474',
                fill: '#000000',
            },
        },
        hearts: {
            totalLifes: 8,
            x: 20,
            y: 20,
            offset: 40,
            spriteSheet: 'hearts',
            frameName: 'heart-on',
        },
        explosion: {
            x: -1000,
            y: -1000,
            spriteSheet: 'explosion',
            frameName: null,
        },
        guy: {
            x: -80,
            y: 152,
            offsetX: 100,
            spriteSheet: 'scavenger',
            frameName: 'scavenger4',
        },
        zombies: [{
            x: 440,
            y: 500,
            time: 2000,
            animation: 'rightIdle',
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 370,
            },
        }, {
            x: 700,
            y: 750,
            time: 2000,
            animation: 'rightIdle',
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 630,
            },
        }, {
            x: 950,
            y: 500,
            time: 2000,
            animation: 'rightIdle',
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 880,
            },
        }, {
            x: 1300,
            y: 500,
            time: 2000,
            animation: 'rightIdle',
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 1230,
            },
        }, {
            x: 1820,
            y: 250,
            time: 2000,
            animation: 'rightIdle',
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 1520,
            },
        }, {
            x: 0,
            y: 1000,
            time: 7000,
            animation: 'leftIdle',
            spriteSheet: 'zombie',
            frameName: 'Zombie9',
            tween: {
                offsetY: 96,
                x: 1820,
            },
        }, {
            x: 1820,
            y: 1000,
            time: 7000,
            animation: 'rightIdle',
            spriteSheet: 'zombie',
            frameName: 'Zombie1',
            tween: {
                offsetY: 96,
                x: 0,
            },
        }],
        platforms: [{
            x: -250,
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
            frame: 'Platform3',
        }, {
            x: 650,
            y: 750,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform3',
        }, {
            x: 900,
            y: 500,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform3',
        }, {
            x: 1250,
            y: 500,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform3',
        }, {
            x: 1500,
            y: 250,
            scaleX: 1,
            scaleY: 1,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }],
    };
}
