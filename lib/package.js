'use strict';
const Promise = require('bluebird');
const path = require('path');
const InitializeFile = require('chuck-steve-initialize-file');
const PackageFolder = require('chuck-steve-package-folder');

module.exports = () => {
  let initializeFile = new InitializeFile(path.resolve('./initialize.ck'));
  let packageFolder = new PackageFolder(path.resolve('./package'));

  let filePaths;
  return initializeFile
    .getFilePaths()
    .then(fps => filePaths = fps)
    .then(packageFolder.isValid)
    .then(isValid => {
      if(isValid) {
        return;
      }
      return Promise.reject(new Error('Invalid Package Folder'));
    })
    .then(packageFolder.clear)
    .then(() => Promise.all(filePaths.map(packageFolder.add)));
};
