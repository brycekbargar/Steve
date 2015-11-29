module.exports = function(logConsole, errorConsole) {
  logConsole = logConsole || console.log;
  errorConsole = errorConsole || console.error;

  return function(args) {
    var opt = require('optimist')
      .usage(
'Manages ChucK packages\n\n' +
'Usage: steve <command>\n\n' +
'where <command> is one of:\n' +
'  start, package, restore, watch, test, init'
      );
    var argv = args ? opt.parse(args) : opt.argv;

    if(argv._ && argv._.length && argv._.length === 1) {
      switch(argv._[0]) {
      case 'start': {
        require('./start.js')();
        break;
      }
      case 'package': {
        require('./package.js')();
        break;
      }
      case 'restore': {
        require('./restore.js')();
        break;
      }
      case 'watch': {
        require('./watch.js')();
        break;
      }
      case 'test': {
        require('./test.js')();
        break;
      }
      case 'init': {
        require('./init.js')();
        break;
      }
      default: {
        opt.showHelp(errorConsole);
      }}
    }
    else {
      opt.showHelp(errorConsole);
    }
  };
};
