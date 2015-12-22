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
    .then(() => Promise.all([pkg.getAllDependencyPaths(), init.getFilePaths()]))
    .then(paths => {
      let depPaths = paths[0] || [];
      let initPaths = paths[1] || [];
      return Promise.all(depPaths.concat(initPaths).map(chuck.add));
    });
};
