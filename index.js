'use strict';

var normalize = require('normalize-path');
var bundleScripts = require('./lib/bundle-scripts');
var bundleSass = require('./lib/bundle-sass');
var bundleLess = require('./lib/bundle-less');
var async = require('async');
var path = require('path');
var livereload = require('./lib/livereload');

function fosify(opts) {
  var currentPath = path.resolve(process.cwd());

  opts = opts || {};

  opts.src = normalize(opts.src || './');
  opts.dest = path.resolve(currentPath, opts.dest || './build');
  opts.ignore = opts.ignore || ['./**/node_modules/**',
                                './**/bower_components/**'];

  async.applyEachSeries([
    bundleScripts,
    bundleSass,
    bundleLess], opts, function(err) {
    if (opts.livereload) {
      livereload(opts);
    }
  });
}

exports = module.exports = fosify;

exports.changed = livereload.changed;
