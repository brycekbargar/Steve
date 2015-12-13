'use strict';
const Promise = require('bluebird');
const npmLoad = Promise.promisify(require('npm').load);

module.exports = () =>
  npmLoad()
    .then(npm => {
      npm.config.set('init-module', require.resolve('chuck-steve-init'));
      return Promise.promisify(npm.commands.init)();
    });
