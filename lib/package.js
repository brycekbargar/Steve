module.exports = function() {
  var error = 0;
  var handleErr = function(err) {
    console.error(err);
    error = 1;
  };
  require('chuck-steve-initialize-file')('./initialize.ck', function(err, filePaths) {
    if(err) {
      handleErr(err);
      return;
    }
    require('chuck-steve-package-folder')('./package', function(err, packageAdd){
      if(err) {
        handleErr(err);
        return;
      }
      if(packageAdd && filePaths && filePaths.forEach) {
        filePaths.forEach(function(x) {
          packageAdd(x);
        });
      }
    });
  });
  return error;
};
