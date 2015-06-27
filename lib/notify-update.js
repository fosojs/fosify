'use sctict';

var updateNotifier = require('update-notifier');

function notifyUpdate(pkg) {
  updateNotifier({
    pkg: pkg
  }).notify({
    defer: false
  });
}

module.exports = notifyUpdate;
