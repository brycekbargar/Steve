module.exports = function() {
  require('chuck-steve-initialize-file')('./initialize.ck', function(err) {
    console.error(err);
  });
};
