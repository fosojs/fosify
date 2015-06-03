'use strict';

var glob = require('glob');
var less = require('less');
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

function bundleLess(opts, cb) {
  cb = cb || _.noop;

  var src = opts.src;
  var dest = opts.dest || './build';
  var createPath = pathCreator.css(src);

  glob(src + '{/*/**/bundle,/**/*.bundle}.less', function(err, files) {
    async.eachSeries(files, function(filePath, cb) {
      var str = fs.readFileSync(filePath, {
        encoding: 'utf8'
      });
      var lessOpts = {
        filename: filePath
      };

      less.render(str, lessOpts, function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
        var bundleName = createPath(filePath);
        var dest = path.join(opts.dest, bundleName);

        saveFile(dest, result.css);
        console.log('bundled: ' + chalk.magenta(bundleName));
        cb();
      });
    }, cb);
  });
}

function bundle(opts, cb) {
  bundleLess(opts, function() {
    if (opts.watch) {
      gaze(opts.src + '/**/*.less', function(err, watcher) {
        watcher.on('all', function() {
          bundleLess(opts);
        });
      });
    }

    cb();
  });
}

module.exports = bundle;
