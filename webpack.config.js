var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')
var phaser_debug = path.join(__dirname, 'node_modules/phaser-debug/dist/phaser-debug.js')

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/game.js')
        ]
    },
    devtool: 'source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: path.join(__dirname, 'src')
        }, {
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /(phaser(-arcade-physics)?|phaser-debug|jquery(\.signalR)?)(\.min)?\.js$/i,
            loader: 'script'
        }, {
            test: /\.audiosprite\.json$/i,
            loader: 'file?name=[path][name].[ext]?[hash]'
        }, {
            test: /\.(mp3|ac3|ogg|m4a)$/i,
            loader: 'file?name=[path][name].[ext]?[hash]'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file?name=[path][name].[ext]?[hash]'
        }, {
            test: /pixi\.js/,
            loader: 'expose?PIXI'
        }, {
            test: /phaser-split\.js$/,
            loader: 'expose?Phaser'
        }, {
            test: /\.(ttf|woff|eot|woff2|svg)$/i,
            loader: 'file?name=[path][name].[ext]?[hash]'
        }, {
            test: /\.css$/i,
            loader: 'style!css'
        }, {
            test: /p2\.js/,
            loader: 'expose?p2'
        }]
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'phaser-debug': phaser_debug,
            'pixi': pixi,
            'p2': p2
        }
    }
}
