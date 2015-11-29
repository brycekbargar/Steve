var opt = require('optimist')
  .usage(
'Manages ChucK packages\n\n' +
'Usage: steve <command>\n\n' +
'where <command> is one of:\n' +
'  start, package, install, watch, test, init'
  );
var argv = opt.argv;

module.exports = function() {
  if(argv._ && argv._.length && argv._.length === 1) {
    switch(argv._[0]) {
    case 'start': {
      require('./../lib/start.js');
      break;
    }
    case 'package': {
      require('./../lib/package.js');
      break;
    }
    case 'restore': {
      require('./../lib/restore.js');
      break;
    }
    case 'watch': {
      require('./../lib/watch.js');
      break;
    }
    case 'test': {
      console.log('lol ChucK');
      break;
    }
    case 'init': {
      require('./../lib/init.js');
      break;
    }
    default: {
      opt.showHelp();
    }}
  }
  else {
    opt.showHelp();
  }
};
