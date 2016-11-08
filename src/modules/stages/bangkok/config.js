export default function() {
    return {
        background: 'bangkok',
        blackMask: 'transitionBackground',
        textInfo: {
            text: 'Bangkok Stage, Get ready !!',
            finalText: 'GO',
            x: 460,
            y: 200,
            style: {
                font: '60px Karmatic Arcade',
                strokeThickness: 1,
                stroke: '#210474',
                fill: '#ffffff'
            }
        },
        guy: {
            x: 0,
            y: 0,
            spriteSheet: 'scavenger',
            frameName: 'scavenger4'
        },
        zombies: [{
            x: 150,
            y: 0,
            spriteSheet: 'zombie',
            frameName: 'Zombie1'
        }, {
            x: 300,
            y: 0,
            spriteSheet: 'zombie',
            frameName: 'Zombie1'
        }, {
            x: 450,
            y: 0,
            spriteSheet: 'zombie',
            frameName: 'Zombie1'
        }, {
            x: 600,
            y: 0,
            spriteSheet: 'zombie',
            frameName: 'Zombie1'
        }, {
            x: 850,
            y: 0,
            spriteSheet: 'zombie',
            frameName: 'Zombie1'
        }],
        platforms: [{
            x: -50,
            y: 250,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }, {
            x: 400,
            y: 500,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }, {
            x: 750,
            y: 750,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }, {
            x: 1100,
            y: 500,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }, {
            x: 1500,
            y: 250,
            spriteSheet: 'platforms',
            frame: 'Platform1',
        }]
    };
}
