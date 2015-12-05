'use strict';

module.exports = (logConsole, errorConsole) => {
  logConsole = logConsole || console.log;
  errorConsole = errorConsole || console.error;

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
        require('./start.js')();
        return;
      }
      case 'package': {
        require('./package.js')();
        return;
      }
      case 'watch': {
        require('./watch.js')();
        return;
      }
      case 'test': {
        require('./test.js')();
        return;
      }
      case 'init': {
        require('./init.js')();
        return;
      }}
    }

    opt.showHelp(errorConsole);
  };
};
