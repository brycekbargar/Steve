var exec = require('child_process').exec;

exec('npm install',
  function (_, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  }
);
