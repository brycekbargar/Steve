var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var stub = sinon.stub;
var expect = require('chai').use(require('sinon-chai')).expect;

var proxyquireStubs = {};

describe('For the setup command', function() {
  beforeEach('Setup package', function(){
    this.package = proxyquire('./../lib/package.js', proxyquireStubs);
  });
  describe('when interacting with the initialize.ck file expect', function(){
    beforeEach('Setup spies', function(){
      this.initializeFileStub = proxyquireStubs['chuck-steve-initialize-file'] = stub();
      this.initializeError = new Error();
      this.initializeFileStub.callsArgWith(1, this.initializeError);
      this.consoleErrorStub = stub(console, 'error');
    });
    afterEach('Teardown spies', function(){
      console.error.restore();
    });
    it('the file to be loaded', function(){
      this.package();
      expect(this.initializeFileStub).to.have.been.calledOnce;
      expect(this.initializeFileStub).to.have.been.calledWith('./initialize.ck');
    });
    it('the user to be alerted of errors', function() {
      this.package();
      expect(this.consoleErrorStub).to.have.been.calledOnce;
      expect(this.consoleErrorStub).to.have.been.calledWith(this.initializeError);
    });
  });
});
