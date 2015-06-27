'use strict';

var mockery = require('mockery');
var assert = require('assert');
var path = require('path');

describe('Register', function() {
  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
    mockery.deregisterAll();
  });

  it('registers globally installed new plugin', function(done) {
    mockery.registerMock('configstore', function Configstore() {
      this.set = function(key, value) {
        assert.equal(key, 'plugins');
        assert.equal(value.length, 1);

        var plugin = value[0];
        assert.equal(plugin.name, 'foo');
        assert.equal(plugin.path, path.join(__dirname, './index.js'));
        done();
      };

      this.get = function() {
        return [];
      };
    });

    /* to fool cwd */
    mockery.registerMock('path', {
      resolve: function() {
        return __dirname;
      },
      join: path.join
    });

    mockery.registerAllowable('../bin/register');

    /* Package was installed globally */
    process.env.npm_config_global = true;

    require('../bin/register');
  });
});
