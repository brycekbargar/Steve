'use strict';
const VM = require('chuck-steve-vm-manager');
const Package = require('chuck-steve-package');
const InitializeFile = require('chuck-steve-initialize-file');

module.exports = () => {
  let chuck = new VM();
  let pkg = new Package();
  let init = new InitializeFile();

  return chuck
    .start()
    .then(pkg.getAllDependencyPaths)
    .then(paths => Promise.all(paths.map(chuck.add)))
    .then(init.getFilePaths);
};
