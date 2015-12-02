var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var spy = sinon.spy;
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
    describe('if there are errors', function(){
      beforeEach('Setub spies', function(){
        this.initializeError = new Error();
        this.initializeFileStub.callsArgWith(1, this.initializeError);
      });
      it('the user to be alerted', function() {
        this.package();
        expect(this.consoleErrorStub).to.have.been.calledOnce;
        expect(this.consoleErrorStub).to.have.been.calledWith(this.initializeError);
      });
      it('to not continue', function() {
        var packageFolderSpy = proxyquireStubs['chuck-steve-package-folder'] = spy();
        this.package();
        expect(packageFolderSpy).to.not.have.been.called;
      });
    });
    it('the user to not be alerted if things are ok', function() {
      this.initializeFileStub.callsArgWith(1, null);
      this.package();
      expect(this.consoleErrorStub).to.not.have.been.called;
    });
  });
});
