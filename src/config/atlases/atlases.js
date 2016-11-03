export default function() {
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
        'zombie': {
            data: require('../../assets/atlases/zombie.json'),
            format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
            url: require('../../assets/shared/zombie.png')
        }

    }
}
