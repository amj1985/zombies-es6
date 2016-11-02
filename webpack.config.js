var path = require('path');
var webpack = require('webpack');
var phaserModule = path.join(__dirname, 'node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/js/phaser.split.js');
var pixi = path.join(phaserModule, 'build/js/pixi.js');
var p2 = path.join(phaserModule, 'build/js/p2.js');
module.exports = {
    entry: './src/zombiesMain.js',
    output: {
        path: path.join(__dirname, '/build/js'),
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: path.join(__dirname, 'src')
        }, {
            test: /pixi\.js/,
            loader: 'expose?PIXI'
        }, {
            test: /phaser-split\.js$/,
            loader: 'expose?Phaser'
        }, {
            test: /p2\.js/,
            loader: 'expose?p2'
        }]
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
