'use strict';

var mkdirp = require('mkdirp');
var fs = require('fs');
var normalize = require('normalize-path');

function saveFile(filePath, content) {
  var normFilePath = normalize(filePath);
  mkdirp.sync(normFilePath.split('/').slice(0, -1).join('/'));
  fs.writeFileSync(normFilePath, content);
}

module.exports = saveFile;
