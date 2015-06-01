# fosify

## Usage example

``` js
var fosify = require('fosify');

fosify({
  source: './public',
  dest: './build',
  host: 'example.com',
  secureHost: 'secure.example.com', //if not specified, host will be used for secure as well.
  watch: true,
  minify: true
});
```