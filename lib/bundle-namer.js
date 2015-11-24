'use strict';

function bundleNamer(opts) {
  opts = opts || {};

  if (!opts.src) {
    throw new Error('opts.src is required');
  }
  if (!opts.extension) {
    throw new Error('opts.extension is required');
  }

  var src = opts.src;
  var extension = opts.extension;

  return function(filePath) {
    var targetPath;
    if (/[^.\\]+\.bundle\.[^.\\]+$/.test(filePath)) {
      targetPath = filePath.replace(/\.bundle\.[a-z0-9]+/i, '.' + extension);
    } else if (/\/bundle\.[^.\\]+$/.test(filePath)) {
      var parts = filePath.split('/');
      targetPath = parts.splice(0, parts.length - 1).join('/') + '.' + extension;
    } else {
      targetPath = filePath.replace(/\.[a-z0-9]+$/i, '.' + extension);
    }
    return targetPath.replace(src + '/', '');
  };
}

module.exports = bundleNamer;
