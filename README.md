# Fosify

A convention over configuration bundler.

[![Dependency Status](https://david-dm.org/zkochan/fosify/status.svg?style=flat)](https://david-dm.org/zkochan/fosify) 
[![Build Status](https://travis-ci.org/zkochan/fosify.svg)](https://travis-ci.org/zkochan/fosify)
[![npm version](https://badge.fury.io/js/fosify.svg)](http://badge.fury.io/js/fosify)


## Installation

```
npm install --save-dev fosify
```


## Why not Gulp?

Gulp is a great task runner and has many libraries for bundling JavaScript and styles. However, a lot of configuration has to be done, to write a good gulpfile. Fosify does a lot with little effort:

* [Browserifies](http://browserify.org/) the JavaScript files.
* Transforms [Less](http://lesscss.org/) or [Sass](http://sass-lang.com/) files to CSS.
* Watches for changes in the source files and rebundles them on change.
* Starts a LiveReload server that will reload the browser each time a bundle was updated.


## Available plugins

* [Fosify JS](https://github.com/zkochan/fosify-js)
* [Fosify Less](https://github.com/zkochan/fosify-less)
* [Fosify Sass](https://github.com/zkochan/fosify-sass)


## Why is it convention over configuration?

When using vanilla Browserify, each JavaScript file that has to be bundled needs to be specified. Fosify will bundle 2 types of JavaScript files:

1. Files that are named **bundle.js** and are not in the root source directory. This files will be bundled, moved one folder up in the destination directory and renamed to the containing folder. For example, **/src/foo/bundle.js** would be bundled to **/dest/foo.js**.
2. Files named **[something].bundle.js**. This files will be moved to the same directory as in the source folder and will be renamed, so that the bundle suffix is gone. For example, **/src/foo/bar.bundle.js** would be bundled to **/dest/foo/bar.js**.

The same conventions work for the less and sass/scss files.


## Usage example

``` js
var fosify = require('fosify');
var less = require('fosify-less');

fosify({
  src: './public',
  dest: './build',
  host: 'example.com',
  secureHost: 'secure.example.com', //if not specified, host will be used for secure as well.
  watch: true,
  minify: true
})
.plugin(less)
.bundle();
```


## License

The MIT License (MIT)
