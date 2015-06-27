'use strict';

var chalk = require('chalk');

module.exports = {
  bundled: function(bundleName) {
    console.log('bundled: ' + chalk.magenta(bundleName));
  }
};
