'use strict';

var glob = require('glob');
var sass = require('node-sass');
var pathCreator = require('./path-creator');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var normalize = require('normalize-path');
var chalk = require('chalk');
var async = require('async');
var gaze = require('gaze');
var _ = require('lodash');

function saveFile(filePath, content) {
  var normFilePath = normalize(filePath);
  mkdirp.sync(normFilePath.split('/').slice(0, -1).join('/'));
  fs.writeFileSync(normFilePath, content);
}

function bundleSass(opts, cb) {
  cb = cb || _.noop;

  var source = opts.source;
  var dest = opts.dest || './build';
  var createPath = pathCreator.css(source);

  glob(source + '/*/**/bundle.{sass,scss}', function(err, files) {
    async.eachSeries(files, function(file, cb) {
      sass.render({
        file: file,
        outputStyle: opts.minify ? 'expanded' : 'compressed',
      }, function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
        var bundleName = createPath(file);
        var dest = path.join(opts.dest, bundleName);

        saveFile(dest, result.css);
        console.log('bundled: ' + chalk.magenta(bundleName));
        cb();
      });
    }, cb);
  });
}

function bundle(opts, cb) {
  bundleSass(opts, function() {
    if (opts.watch) {
      gaze(opts.source + '/**/*.{sass,scss}', function(err, watcher) {
        watcher.on('all', function() {
          bundleSass(opts);
        });
      });
    }

    cb();
  });
}

module.exports = bundle;
