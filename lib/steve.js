'use strict';
const Promise = require('bluebird');

module.exports = () => {

  let executeAsync = (command) => {
    return command()
      .then(result => {
        if(result === 1) {
          return Promise.reject();
        }
        return 0;
      });
  };

  let execute = (command) => {
    return new Promise((resolve, reject) => {
      try {
        let result = command();
        if(result === 1) {
          reject();
          return;
        }
        resolve();
      } catch(err) {
        reject(err);
      }
    });
  };

  return (args) => {
    let opt = require('optimist')
      .usage(`
Manages ChucK packages

Usage: steve <command>

where <command> is one of:
    start, package, restore, watch, test, init`
      );
    let argv = args ? opt.parse(args) : opt.argv;

    if(argv._ && argv._.length === 1) {
      switch(argv._[0]) {
      case 'start': {
        return execute(require('./start.js'));
      }
      case 'package': {
        return executeAsync(require('./package.js'));
      }
      case 'publish': {
        return executeAsync(require('./publish.js'));
      }
      case 'test': {
        return execute(require('./test.js'));
      }
      case 'init': {
        return executeAsync(require('./init.js'));
      }}
    }

    opt.showHelp();
  };
};
