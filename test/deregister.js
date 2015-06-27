'use strict';

var mockery = require('mockery');
var assert = require('assert');
var path = require('path');

describe('Deregister', function() {
  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
    mockery.deregisterAll();
  });

  it('deregisters globally uninstalled plugin', function(done) {
    mockery.registerMock('configstore', function Configstore() {
      this.set = function(key, value) {
        assert.equal(key, 'plugins');
        assert.equal(value.length, 0);
        done();
      };

      this.get = function() {
        return [{
          name: 'foo',
          path: '/some/path/index.js'
        }];
      };
    });

    /* to fool cwd */
    mockery.registerMock('path', {
      resolve: function() {
        return __dirname;
      },
      join: path.join
    });

    mockery.registerAllowable('../bin/deregister');

    /* Package was uninstalled globally */
    process.env.npm_config_global = true;

    require('../bin/deregister');
  });
});
