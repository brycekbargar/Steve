module.exports = function() {
  var error = 0;
  var handleErr = function(err) {
    console.error(err);
    error = 1;
  };
  require('chuck-steve-initialize-file')('./initialize.ck', function(err) {
    if(err) {
      handleErr(err);
      return;
    }
    require('chuck-steve-package-folder')('./package', function(err){
      if(err) {
        handleErr(err);
        return;
      }
    });
  });
  return error;
};
