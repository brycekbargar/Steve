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
      var initializeError = new Error();
      this.initializeFileStub.callsArgWith(1, initializeError);
      this.package();
      expect(this.consoleErrorStub).to.have.been.calledOnce;
      expect(this.consoleErrorStub).to.have.been.calledWith(initializeError);
    });
    it('the user to not be alerted if things are ok', function() {
      this.initializeFileStub.callsArgWith(1, null);
      this.package();
      expect(this.consoleErrorStub).to.not.have.been.called;
    });
  });
});
