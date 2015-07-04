'use strict';

var deregister = require('../lib/deregister');
var assert = require('assert');
var path = require('path');

describe('Deregister', function() {
  it('deregisters globally uninstalled plugin', function(done) {
    var configstore = {
      set: function(key, value) {
        assert.equal(key, 'plugins');
        assert.equal(value.length, 0);
        done();
      },
      get: function() {
        return [{
          name: 'foo',
          path: '/some/path/index.js'
        }];
      }
    };

    /* Package was uninstalled globally */
    process.env.npm_config_global = true;

    var pkg = {
      name: 'foo'
    };
    deregister(configstore, pkg);
  });
});
