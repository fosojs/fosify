#!/usr/bin/env node
'use strict';

var Configstore = require('configstore');
var path = require('path');
var cwd = path.resolve(process.cwd());
var pkg = require(path.join(cwd, './package.json'));

/* only if the package was uninstalled globally */
if (!!process.env.npm_config_global) {
  console.log('Deregistering ' + pkg.name +
              ' Foso plugin (because it was uninstalled globally)');
  console.log('');

  var conf = new Configstore('foso', { plugins: [] });
  var oldPlugins = conf.get('plugins');

  var newPlugins = oldPlugins.filter(function(plugin) {
    return plugin.name !== pkg.name;
  });

  conf.set('plugins', newPlugins);
}
