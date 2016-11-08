module.exports = () => {
    return {
        guy: [{
            name: 'rightIdle',
            frames: [
                'scavenger1',
                'scavenger2',
                'scavenger3',
                'scavenger4',
                'scavenger5',
                'scavenger6'
            ],
            frameRate: 8,
            loop: true,
            useNumericIndex: false
        }, {
            name: 'leftIdle',
            frames: [
                'scavenger11',
                'scavenger12',
                'scavenger13',
                'scavenger14',
                'scavenger15',
                'scavenger16'
            ],
            frameRate: 8,
            loop: true,
            useNumericIndex: false
        }, {
            name: 'leftAttack',
            frames: [
                'scavenger20',
                'scavenger19'
            ],
            frameRate: 12,
            loop: false,
            useNumericIndex: false
        }, {
            name: 'rightAttack',
            frames: [
                'scavenger7',
                'scavenger8'
            ],
            frameRate: 12,
            loop: false,
            useNumericIndex: false
        }],
        explosion: [{
          name: 'explosion',
          frames: [
            'Explosion_01',
            'Explosion_02',
            'Explosion_03',
            'Explosion_04',
            'Explosion_05',
            'Explosion_06',
            'Explosion_07',
            'Explosion_08',
            'Explosion_09',
            'Explosion_10',
            'Explosion_11',
            'Explosion_12'
          ],
          frameRate: 12,
          loop: false,
          useNumericIndex: false
        }],
        zombie: [{
          name: 'rightIdle',
          frames: [
              'Zombie1',
              'Zombie2',
              'Zombie3',
              'Zombie4',
              'Zombie5',
              'Zombie6'
          ],
          frameRate: 8,
          loop: true,
          useNumericIndex: false
      }, {
          name: 'leftIdle',
          frames: [
              'Zombie9',
              'Zombie10',
              'Zombie11',
              'Zombie12',
              'Zombie13',
              'Zombie14'
          ],
          frameRate: 8,
          loop: true,
          useNumericIndex: false
      }, {
          name: 'leftAttack',
          frames: [
              'Zombie15',
              'Zombie16'
          ],
          frameRate: 12,
          loop: false,
          useNumericIndex: false
      }, {
          name: 'rightAttack',
          frames: [
              'Zombie7',
              'Zombie8'
          ],
          frameRate: 12,
          loop: false,
          useNumericIndex: false
        }]

    }
};
