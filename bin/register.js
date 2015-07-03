#!/usr/bin/env node
'use strict';

var Configstore = require('configstore');
var path = require('path');
var cwd = path.resolve(process.cwd());
var pkg = require(path.join(cwd, './package.json'));

/* only if the package was installed globally */
if (!!process.env.npm_config_global) {
  console.log('Registering ' + pkg.name +
              ' as a Foso plugin (because it was installed globally)');
  console.log('');

  var conf = new Configstore('foso', { plugins: [] });
  var plugins = conf.get('plugins');

  var newPlugin = {
    name: pkg.name,
    path: path.join(cwd, pkg.main)
  };

  var duplicates = plugins.filter(function(plugin) {
    return plugin.name.toLowerCase() === newPlugin.name.toLowerCase() ||
      plugin.path.toLowerCase() === newPlugin.path.toLowerCase();
  });

  if (duplicates.length) {
    console.log('Plugin already registered.');
    console.log('Name: ' + duplicates[0].name);
    console.log('Path: ' + duplicates[0].path);
  } else {
    plugins.push(newPlugin);
    conf.set('plugins', plugins);
  }
}
