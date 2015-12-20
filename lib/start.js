'use strict';
const VM = require('chuck-steve-vm-manager');
const DependencyTree = require('chuck-steve-dependency-tree');

module.exports = () => {
  let chuck = new VM();
  let dependencyTree = new DependencyTree();

  return chuck
    .start()
    .then(dependencyTree.load);
};
