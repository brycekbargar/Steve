describe('For the setup command', function() {
  beforeEach('Setup package', function(){
    this.package = require('./../lib/package.js');
  });
  describe('expect it', function(){
    it('to pass', function(){
      this.package();
    });
  });
});
