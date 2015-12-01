module.exports = function() {
  require('npm').load(function(err, npm) {
    npm.commands.install();
  });
};
