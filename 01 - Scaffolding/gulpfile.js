var gulp  = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});
gulp.task("run-zombies", function(callback) {
    var mConfig = Object.create(webpackConfig);
    mConfig.devtool = "eval";
    mConfig.debug = true;
    new WebpackDevServer(webpack(mConfig), {
      publicPath : "/dist/",
      stats: {
        colors : true
      }}).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
    });
});
