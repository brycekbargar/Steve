'use strict';

module.exports = () => {
  let error = 0;
  let handleErr = (err) => {
    console.error(err);
    error = 1;
  };
  require('chuck-steve-initialize-file')('./initialize.ck', (err, filePaths) => {
    if(err) {
      handleErr(err);
      return;
    }
    require('chuck-steve-package-folder')('./package', (err, packageFolder) => {
      if(err) {
        handleErr(err);
        return;
      }

      packageFolder.clear();
      filePaths.forEach(packageFolder.add);
    });
  });
  return error;
};
