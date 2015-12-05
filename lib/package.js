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
    require('chuck-steve-package-folder')('./package', function(err, packageFolder){
      if(err) {
        handleErr(err);
        return;
      }

      packageFolder.clear();
      if(packageFolder && filePaths && filePaths.forEach) {
        filePaths.forEach(function(x) {
          packageFolder.add(x);
        });
      }
    });
  });
  return error;
};
