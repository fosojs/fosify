'use strict';

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var vfs = require('vinyl-fs');
var uglify = require('gulp-uglify');
var _ = require('lodash');
var glob = require('glob');
var watchify = require('watchify');
var browserify = require('browserify');
var lessify = require('node-lessify');
var stringify = require('stringify');
var chalk = require('chalk');
var jadeify = require('jadeify');
var babelify = require('babelify');
var path = require('path');
var gulpif = require('gulp-if');
var normalize = require('normalize-path');
var redirectify = require('redirectify');
var replace = require('browserify-replace');

var es6Extensions = ['.babel', '.es6'];

function bundle(bundleName, bundler, opts) {
  opts = opts || {};

  if (!opts.dest) {
    throw new Error('opts.dest is required');
  }

  return bundler
    .bundle()
    .on('error', function(err) {
      console.log('Error during bundling');
      console.error(err);
    })
    .pipe(source(bundleName))
    .pipe(buffer())
    .pipe(gulpif(opts.minify, uglify()))
    .pipe(vfs.dest(opts.dest));
}

function fosify(opts) {
  opts = opts || {};

  if (!opts.host) {
    throw new Error('opts.host is required');
  }
  var origin = 'http://' + opts.host;
  var secureOrigin = 'https://' + (opts.secureHost || opts.host);
  var source = normalize(opts.source || './');
  var dest = opts.dest || './build';

  var rootIndexRegex = RegExp(source + '/fosofile\.(js|es6|babel)');
  function getBundleName(filePath) {
    if (rootIndexRegex.test(filePath)) {
      return 'index.js'
    }
    var parts = filePath.split('/');
    var targetPath = parts.splice(0, parts.length - 1).join('/') + '.js';
    return targetPath.replace(source + '/', '');
  }

  glob(source + '{/*/**/bundle,/fosofile}.{js,es6,babel}', function(err, files) {
    files.forEach(function(file) {
      var bundleName = getBundleName(file);

      var browserifyOpts = _.extend(opts.watch ? watchify.args : {}, {
        entries: [file],
        extensions: ['.js', '.json'].concat(es6Extensions),
        paths: [path.join(__dirname, './node_modules')]
      });

      var redirOpts = {};
      if (opts.env) {
        redirOpts.suffix = '.' + opts.env;
      }

      var bundler = _.flow(browserify, opts.watch ? watchify : _.identity)(browserifyOpts)
        .transform(lessify)
        .transform(jadeify, { pretty: false })
        .transform(babelify.configure({
          extensions: es6Extensions
        }))
        .transform(stringify({
          extensions: ['.html', '.txt'],
          minify: true,
          minifier: {
            extensions: ['.html']
          }
        }))
        .transform(redirectify, redirOpts)
        .transform(replace, {
          replace: [{
            from: /__origin/,
            to: '\'' + origin + '\''
          }, {
            from: /__secureOrigin/,
            to: '\'' + secureOrigin + '\''
          }]
        });

      function rebundle() {
        bundle(bundleName, bundler, {
          minify: opts.minify,
          dest: dest
        });
        console.log('bundled: ' + chalk.magenta(bundleName));
      }

      bundler.on('update', rebundle);

      rebundle();
    });
  });
}

module.exports = fosify;
