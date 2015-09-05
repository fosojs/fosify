'use strict';

var chalk = require('chalk');
var gulpLog = require('./gulp-log');

module.exports = {
  bundled: function(bundleName) {
    gulpLog('bundled: ' + chalk.magenta(bundleName));
  }
};
