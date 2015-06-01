'use strict';

var _ = require('lodash');

function pathCreator(source, extension) {
  return function(filePath) {
    var parts = filePath.split('/');
    var targetPath = parts.splice(0, parts.length - 1).join('/') + '.' + extension;
    return targetPath.replace(source + '/', '');
  }
}

exports.js = _.partialRight(pathCreator, 'js');
exports.css = _.partialRight(pathCreator, 'css');
