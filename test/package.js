var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var spy = sinon.spy;
var stub = sinon.stub;
var expect = require('chai').use(require('sinon-chai')).expect;

var proxyquireStubs = {};

describe('For the setup command', function() {
  beforeEach('Setup spies', function() {
    this.consoleErrorStub = stub(console, 'error');
    this.initializeFileStub = proxyquireStubs['chuck-steve-initialize-file'] = stub();
    this.initializeFileStub.callsArgWith(1, null);
    this.packageFolderSpy = proxyquireStubs['chuck-steve-package-folder'] = spy();
  });
  afterEach('Teardown spies', function(){
    console.error.restore();
  });
  beforeEach('Setup package', function(){
    this.package = proxyquire('./../lib/package.js', proxyquireStubs);
  });
  describe('when interacting with the initialize.ck file', function(){
    it('expect the file to be loaded', function(){
      this.package();
      expect(this.initializeFileStub).to.have.been.calledOnce;
      expect(this.initializeFileStub).to.have.been.calledWith('./initialize.ck');
    });
    describe('and there are errors', function(){
      beforeEach('Setub spies', function(){
        this.initializeError = new Error();
        this.initializeFileStub.callsArgWith(1, this.initializeError);
      });
      it('expect the user to be alerted', function() {
        this.package();
        expect(this.consoleErrorStub).to.have.been.calledOnce;
        expect(this.consoleErrorStub).to.have.been.calledWith(this.initializeError);
      });
      it('expect to not continue', function() {
        this.package();
        expect(this.packageFolderSpy).to.not.have.been.called;
      });
      it('expect to exit with a 1', function() {
        var exitValue = this.package();
        expect(exitValue).to.equal(1);
      });
    });
    it('and there are no errors expect silence', function() {
      this.initializeFileStub.callsArgWith(1, null);
      this.package();
      expect(this.consoleErrorStub).to.not.have.been.called;
    });
  });
  describe('when interacting with the package folder', function(){
    it('expect the folder to be loaded', function(){
      this.package();
      expect(this.packageFolderSpy).to.have.been.calledOnce;
    });
  });
});
