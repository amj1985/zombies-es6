module.exports = () => {
  return {
    'platforms': {
      data: require('../../assets/atlases/platforms.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/platforms.png')
    },
    'scavenger': {
      data: require('../../assets/atlases/scavenger.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/scavenger.png')
    },
    'scavenger2': {
      data: require('../../assets/atlases/scavenger.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/scavenger2.png')
    },
    'buttonPlay': {
      data: require('../../assets/atlases/buttons.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/buttons.png')
    },
    'zombie': {
      data: require('../../assets/atlases/zombie.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/zombie.png')
    },
    'hearts': {
      data: require('../../assets/atlases/heart.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/heart.png')
    },
    'explosion': {
      data: require('../../assets/atlases/explosion.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/explosion.png')
    },
    'bonus': {
      data: require('../../assets/atlases/bonus.json'),
      format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
      url: require('../../assets/shared/bonus.png')
    }
  }
};
