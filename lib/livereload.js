'use strict';

var LiveReload = require('tiny-lr').Server;
var gaze = require('gaze');

var defaultOpts = {
  port: '2769'
};

function livereload(opts) {
  var passedOpts = typeof opts.livereload === 'object' ? opts.livereload : {};
  var lrOpts = _.extend(passedOpts, defaultOpts);
  var livereload = new LiveReload();
  livereload.listen(lrOpts.port, '0.0.0.0');

  gaze(path.join(opts.dest, './**/*.{js,css}'), function(err, watcher) {
    watcher.on('changed', function(filePath) {
      livereload.changed({
        body: {
          files: [filePath]
        }
      });
    });
  });
}

module.exports = livereload;
