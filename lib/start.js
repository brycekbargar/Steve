var exec = require('child_process').exec;

exec('chuck initialize.ck',
  function (_, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  }
);
