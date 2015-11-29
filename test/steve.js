var expect = require('chai').expect;

var steve = require('./../lib/steve.js');

describe('For the steve executable', function() {
  it('expect to pass', function(){
    steve();
    expect(1).to.equal(1);
  });
});
