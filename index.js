'use strict';

var normalize = require('normalize-path');
var bundleScripts = require('./lib/bundle-scripts');
var bundleStyles = require('./lib/bundle-styles');
var async = require('async');
var path = require('path');
var livereload = require('./lib/livereload');

function fosify(opts) {
  var currentPath = path.resolve(process.cwd());

  opts = opts || {};

  opts.src = normalize(opts.src || './');
  opts.dest = path.resolve(currentPath, opts.dest || './build');

  async.applyEachSeries([bundleScripts, bundleStyles], opts, function(err) {
    if (opts.livereload) {
      livereload(opts);
    }
  });
}

exports = module.exports = fosify;

exports.changed = livereload.changed;
