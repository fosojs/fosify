'use strict';

var register = require('../lib/register');
var expect = require('chai').expect;

describe('Register', function() {
  it('registers globally installed new plugin', function(done) {
    var configstore = {
      set: function(key, value) {
        expect(key).to.equal('plugins');
        expect(value.length).to.equal(1);

        var plugin = value[0];
        expect(plugin.name).to.equal('foo');
        expect(plugin.path).to.equal('/some/path/index.js');
        done();
      },
      get: function() {
        return [];
      }
    };

    /* Package was installed globally */
    process.env.npm_config_global = true;

    var pkg = {
      name: 'foo',
      main: 'index.js'
    };
    var cwd = '/some/path';
    register(configstore, pkg, cwd);
  });

  it('does not register plugin that already registered', function() {
    var configstore = {
      set: function(key, value) {
        expect.fail();
      },
      get: function() {
        return [{
          name: 'foo',
          path: '/some/path/index.js'
        }];
      }
    };

    /* Package was installed globally */
    process.env.npm_config_global = true;

    var pkg = {
      name: 'foo',
      main: 'index.js'
    };
    var cwd = '/some/path';
    register(configstore, pkg, cwd);
  });
});
