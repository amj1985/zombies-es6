var gulp  = require('gulp'),
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var stream = require('webpack-stream');

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});
