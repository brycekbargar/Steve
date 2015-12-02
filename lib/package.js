module.exports = function() {
  require('chuck-steve-initialize-file')('./initialize.ck', function(err) {
    if(err) {
      console.error(err);
    }
  });
};
