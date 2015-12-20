'use strict';
const VM = require('chuck-steve-vm-manager');

module.exports = () => {
  let chuck = new VM();

  return chuck
    .start();
};
