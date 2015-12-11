'use strict';
const Promise = require('bluebird');
const InitializeFile = require('chuck-steve-initialize-file');
const PackageFolder = require('chuck-steve-package-folder');

module.exports = () => {
  let initializeFile = new InitializeFile('./initialize.ck');
  let packageFolder = new PackageFolder('./package');

  return initializeFile
    .getFilePaths()
    .then(filePaths =>
      packageFolder
        .clear()
        .then(() => Promise.all(filePaths.map(packageFolder.add))));
};
