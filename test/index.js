'use strict';

var assert = require('assert');
var fosify = require('../lib');

describe('Fosify', function() {
  it('should pass options to the plugin', function(done) {
    fosify({
      src: 'foo'
    })
    .plugin(function(opts, cb) {
      assert.equal(opts.src, 'foo');
      cb();
      done();
    })
    .bundle();
  });

  it('should execute callback once plugins were executed', function(done) {
    fosify({})
    .plugin(function(opts, cb) {
      cb();
    })
    .bundle(function() {
      done();
    });
  });
});
