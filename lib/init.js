'use strict';

module.exports = () =>
  require('npm').load((err, npm) => {
    npm.config.set('init-module', require.resolve('chuck-steve-init'));
    npm.commands.init();
  });
