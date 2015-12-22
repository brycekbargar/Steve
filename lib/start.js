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
    .then(() => Promise.all([
      pkg.getAllDependencyPaths(),
      init.getFilePaths(),
      pkg.main()
    ]))
    .then(paths => {
      return Promise.all(paths
        .reduce((prev, curr) => prev.concat(curr))
        .map(chuck.add));
    });
};
