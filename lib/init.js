'use strict';
const Promise = require('bluebird');
const load = Promise.promisify(require('npm').load);

module.exports = () => load()
  .then(npm => {
    npm.config.set('init-module', require.resolve('chuck-steve-init'));
    return Promise.promisify(npm.commands.init)();
  });
