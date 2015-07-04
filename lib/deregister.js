'use strict';

function deregister(conf, pkg) {
  /* only if the package was uninstalled globally */
  if (!!process.env.npm_config_global) {
    console.log('Deregistering ' + pkg.name +
                ' Foso plugin (because it was uninstalled globally)');
    console.log('');

    var oldPlugins = conf.get('plugins');

    var newPlugins = oldPlugins.filter(function(plugin) {
      return plugin.name !== pkg.name;
    });

    conf.set('plugins', newPlugins);
  }
}

module.exports = deregister;
