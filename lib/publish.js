'use strict';
const Promise = require('bluebird');
const pkg = require('./package');
const npmLoad = Promise.promisify(require('npm').load);

module.exports = () =>
  pkg()
    .then(npmLoad)
    .then(npm => Promise.promisify(npm.commands.publish)());
