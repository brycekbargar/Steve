module.exports = function() {
  require('npm').load(function(err, npm) {
    npm.config.set('init-module', require.resolve('./init-input.js'));
    npm.commands.init();
  });
};
