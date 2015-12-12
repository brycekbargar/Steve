'use strict';

module.exports = (logConsole, errorConsole) => {
  logConsole = logConsole || console.log;
  errorConsole = errorConsole || console.error;

  let executeAsync = (command) => {
    return command()
      .then(result => {
        if(result === 0) {
          return 0;
        }
        return Promise.reject();
      });
  };

  let execute = (command) => {
    return new Promise((resolve, reject) => {
      try {
        let result = command();
        if(result === 0) {
          resolve(0);
          return;
        }
        reject();
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
      case 'watch': {
        return execute(require('./watch.js'));
      }
      case 'test': {
        return execute(require('./test.js'));
      }
      case 'init': {
        return execute(require('./init.js'));
      }}
    }

    opt.showHelp(errorConsole);
  };
};
