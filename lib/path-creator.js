'use strict';

var _ = require('lodash');

function pathCreator(source, extension) {
  return function(filePath) {
    var targetPath;
    if (new RegExp('\\.bundle\\.' + extension + '$').test(filePath)) {
      targetPath = filePath.replace('.bundle', '');
    } else {
      var parts = filePath.split('/');
      targetPath = parts.splice(0, parts.length - 1).join('/') + '.' + extension;
    }
    return targetPath.replace(source + '/', '');
  };
}

exports.js = _.partialRight(pathCreator, 'js');
exports.css = _.partialRight(pathCreator, 'css');
