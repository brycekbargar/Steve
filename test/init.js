var expect = require('chai').expect;

describe('For the init command', function() {
  beforeEach('Setup init', function(){
    this.init = require('./../lib/init.js');
  });
  it('should pass', function(){
    this.init();
  });
});
