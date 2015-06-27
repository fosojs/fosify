'use strict';

var fosify = require('../lib');
var expect = require('chai').expect;

describe('fosify', function() {
  it('exports everything', function() {
    expect(fosify.bundleNamer).to.be.ok;
    expect(fosify.saveFile).to.be.ok;
    expect(fosify.log).to.be.ok;
    expect(fosify.noop).to.be.ok;
    expect(fosify.notifyUpdate).to.be.ok;
  });
});
