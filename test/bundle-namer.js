'use strict';

var assert = require('assert');
var bundleNamer = require('../lib/bundle-namer');

describe('bundleNamer', function() {
  it('bundle taking directory name', function() {
    var createPath = bundleNamer({
      src: '/home/foo/src',
      extension: 'js'
    });
    assert.equal(createPath('/home/foo/src/qar/bar/bundle.js'), 'qar/bar.js');
  });

  it('bundle taking part of file name', function() {
    var createPath = bundleNamer({
      src: '/home/foo/src',
      extension: 'js'
    });
    var result = createPath('/home/foo/src/qar/bar/index.bundle.js');
    assert.equal(result, 'qar/bar/index.js');
  });

  it('bundle taking part of file name and changing extension', function() {
    var createPath = bundleNamer({
      src: '/home/foo/src',
      extension: 'css'
    });
    var result = createPath('/home/foo/src/qar/bar/index.bundle.less');
    assert.equal(result, 'qar/bar/index.css');
  });
});
