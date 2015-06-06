'use strict';

var _ = require('lodash');

function pathCreator(src, extension) {
  return function(filePath) {
    var targetPath;
    if (/[^.\\]+\.bundle\.[^.\\]+$/.test(filePath)) {
      targetPath = filePath.replace(/\.bundle\.[a-z0-9]+/i, '.' + extension);
    } else {
      var parts = filePath.split('/');
      targetPath = parts.splice(0, parts.length - 1).join('/') + '.' + extension;
    }
    return targetPath.replace(src + '/', '');
  };
}

exports.js = _.partialRight(pathCreator, 'js');
exports.css = _.partialRight(pathCreator, 'css');
