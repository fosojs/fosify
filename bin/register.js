#!/usr/bin/env node
'use strict';

var path = require('path');
var cwd = path.resolve(process.cwd());
var pkg = require(path.join(cwd, './package.json'));
var Configstore = require('configstore');

var conf = new Configstore('foso', { plugins: [] });

require('../lib/register')(conf, pkg, cwd);
