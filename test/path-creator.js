'use strict';

var assert = require('assert');
var pathCreator = require('../lib/path-creator');

describe('pathCreator', function() {
  it('bundle taking directory name', function() {
    var createPath = pathCreator.js('/home/foo/src');
    assert.equal(createPath('/home/foo/src/qar/bar/bundle.js'), 'qar/bar.js');
  });

  it('bundle taking part of file name', function() {
    var createPath = pathCreator.js('/home/foo/src');
    var result = createPath('/home/foo/src/qar/bar/index.bundle.js');
    assert.equal(result, 'qar/bar/index.js');
  });
});
