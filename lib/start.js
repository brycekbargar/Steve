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
      let depPaths = paths[0];
      let initPaths = paths[1];
      let mainPath = [paths[2]];
      return Promise.all(
        depPaths.concat(
        initPaths).concat(
        mainPath)
        .map(chuck.add));
    });
};
