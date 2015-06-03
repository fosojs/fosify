# fosify [![Dependency Status](https://david-dm.org/zkochan/fosify/status.svg?style=flat)](https://david-dm.org/zkochan/fosify) [![Build Status](https://travis-ci.org/zkochan/fosify.svg)](https://travis-ci.org/zkochan/fosify) [![npm version](https://badge.fury.io/js/fosify.svg)](http://badge.fury.io/js/fosify)

## Usage example

``` js
var fosify = require('fosify');

fosify({
  src: './public',
  dest: './build',
  host: 'example.com',
  secureHost: 'secure.example.com', //if not specified, host will be used for secure as well.
  watch: true,
  minify: true
});
```

License
========

The MIT License (MIT)
