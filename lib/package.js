module.exports = function() {
  var error = 0;
  require('chuck-steve-initialize-file')('./initialize.ck', function(err) {
    if(err) {
      console.error(err);
      error = 1;
      return;
    }
    require('chuck-steve-package-folder')('./package');
  });
  return error;
};
