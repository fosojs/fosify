'use strict';

var fosify = require('../');

fosify({
  source: './scripts',
  dest: './build',
  host: 'example.com',
  secureHost: 'secure.example.com',
  watch: true,
  minify: true
});
