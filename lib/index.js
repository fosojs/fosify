'use strict';

var normalize = require('normalize-path');
var async = require('async');
var path = require('path');
var livereload = require('./livereload');
var _ = require('lodash');

function Fosify(opts) {
  var currentPath = path.resolve(process.cwd());

  opts = opts || {};

  opts.src = normalize(opts.src || './');
  opts.dest = path.resolve(currentPath, opts.dest || './build');
  opts.ignore = opts.ignore || ['./**/node_modules/**',
                                './**/bower_components/**'];
  this._opts = opts;

  this._plugins = [];
}

Fosify.prototype.plugin = function(plugin) {
  if (!plugin) {
    throw new Error('plugin is required');
  }

  this._plugins.push(plugin);

  return this;
}

Fosify.prototype.bundle = function(cb) {
  cb = cb || _.noop;
  async.applyEachSeries(this._plugins, this._opts, function(err) {
    if (this._opts.livereload) {
      var extensions = _.intersection(_.map(this._plugins, _.curryRight(_.get, 'extensions')));
      livereload(this._opts, extensions);
    }
    cb();
  }.bind(this));
}

exports = module.exports = function(opts) {
  return new Fosify(opts);
};

exports.changed = livereload.changed;
