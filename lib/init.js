module.exports = function() {
  require('npm').load(function(err, npm) {
    npm.config.set('init-module', require.resolve('chuck-steve-init'));
    npm.commands.init();
  });
};
