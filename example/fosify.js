'use strict';

var fosify = require('../');
var js = require('fosify-js');
var less = require('fosify-less');
var sass = require('fosify-sass');

fosify({
  src: './scripts',
  dest: './build',
  host: 'example.com',
  secureHost: 'secure.example.com',
  watch: true,
  minify: true
})
.plugin(js)
.plugin(less)
.plugin(sass)
.bundle(function() {
  console.log('bundled');
});
