module.exports = () => {
    return {
        effects: {
            data: require('!!file?name=[path][name].[ext]?[hash]!./effects.json'),
            urls: [
                require('../../assets/audiosprites/effects.ac3'),
                require('../../assets/audiosprites/effects.m4a'),
                require('../../assets/audiosprites/effects.mp3'),
                require('../../assets/audiosprites/effects.ogg')
            ]
        },
        music: {
            data: require('!!file?name=[path][name].[ext]?[hash]!./music.json'),
            urls: [
                require('../../assets/audiosprites/music.ac3'),
                require('../../assets/audiosprites/music.m4a'),
                require('../../assets/audiosprites/music.mp3'),
                require('../../assets/audiosprites/music.ogg')
            ]
        }
    }
};
