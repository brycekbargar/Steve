var proxyquire = require('proxyquire').noCallThru();
var spy = require('sinon').spy;
var expect = require('chai').use(require('sinon-chai')).expect;

var proxyquireStubs = {};

describe('For the setup command', function() {
  beforeEach('Setup package', function(){
    this.package = proxyquire('./../lib/package.js', proxyquireStubs);
  });
  describe('when interacting with the initialize.ck file expect', function(){
    beforeEach('Setup spies', function(){
      this.initializeFileSpy = proxyquireStubs['chuck-steve-initialize-file'] = spy();
    });
    it('to load the file', function(){
      this.package();
      expect(this.initializeFileSpy).to.have.been.calledOnce;
      expect(this.initializeFileSpy).to.have.been.calledWith('./initialize.ck');
    });
  });
});
