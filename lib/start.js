'use strict';
const VM = require('chuck-steve-vm-manager');
const Package = require('chuck-steve-package');

module.exports = () => {
  let chuck = new VM();
  let pkg = new Package();

  return chuck
    .start()
    .then(pkg.getAllDependencyPaths)
    .then(paths => Promise.all(paths.map(chuck.add)));
};
