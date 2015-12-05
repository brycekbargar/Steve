'use strict';

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const spy = sinon.spy;
const stub = sinon.stub;
const expect = require('chai').use(require('sinon-chai')).expect;

const proxyquireStubs = {};

describe('For the setup command', () => {
  beforeEach('Setup spies', () => {
    this.consoleErrorStub = stub(console, 'error');

    this.initializeFileStub = proxyquireStubs['chuck-steve-initialize-file'] = stub();
    this.filePaths = ['','',''];
    this.initializeFileStub.callsArgWith(1, null, this.filePaths);

    this.packageFolderStub = proxyquireStubs['chuck-steve-package-folder'] = stub();
    this.packageFolderClearSpy = spy();
    this.packageFolderAddSpy = spy();
    let packageFolder = {
      clear: this.packageFolderClearSpy,
      add: this.packageFolderAddSpy
    };
    this.packageFolderStub.callsArgWith(1, null, packageFolder);
  });
  afterEach('Teardown spies', () => console.error.restore());
  beforeEach('Setup package', () =>
    this.package = proxyquire('./../lib/package.js', proxyquireStubs)
  );
  describe('when interacting with the initialize.ck file', () => {
    it('expect the file to be loaded', () => {
      this.package();
      expect(this.initializeFileStub).to.have.been.calledOnce;
      expect(this.initializeFileStub).to.have.been.calledWith('./initialize.ck');
    });
    describe('and there are errors', () => {
      beforeEach('Setub spies', () => {
        this.initializeError = new Error();
        this.initializeFileStub.callsArgWith(1, this.initializeError);
      });
      it('expect the user to be alerted', () => {
        this.package();
        expect(this.consoleErrorStub).to.have.been.calledOnce;
        expect(this.consoleErrorStub).to.have.been.calledWith(this.initializeError);
      });
      it('expect to not continue', () => {
        this.package();
        expect(this.packageFolderStub).to.not.have.been.called;
      });
      it('expect to exit with a 1', () => {
        let exitValue = this.package();
        expect(exitValue).to.equal(1);
      });
    });
    it('and there are no errors expect silence', () => {
      this.package();
      expect(this.consoleErrorStub).to.not.have.been.called;
    });
  });
  describe('when interacting with the package folder', () => {
    it('expect the folder to be loaded', () => {
      this.package();
      expect(this.packageFolderStub).to.have.been.calledOnce;
      expect(this.packageFolderStub).to.have.been.calledWith('./package');
    });
    describe('and there are errors', () => {
      beforeEach('Setub spies', () => {
        this.packageError = new Error();
        this.packageFolderStub.callsArgWith(1, this.packageError);
      });
      it('expect the user to be alerted', () => {
        this.package();
        expect(this.consoleErrorStub).to.have.been.calledOnce;
        expect(this.consoleErrorStub).to.have.been.calledWith(this.packageError);
      });
      it('expect to not continue', () => {
        this.package();
        expect(this.packageFolderClearSpy).to.not.have.been.called;
        expect(this.packageFolderAddSpy).to.not.have.been.called;
      });
      it('expect to exit with a 1', () => {
        let exitValue = this.package();
        expect(exitValue).to.equal(1);
      });
    });
    describe('and there are no errors', () => {
      it('expect silence', () => {
        this.package();
        expect(this.consoleErrorStub).to.not.have.been.called;
      });
      it('expect the package folder to be cleared', () => {
        this.package();
        expect(this.packageFolderClearSpy).to.have.been.called;
      });
      it('expect each returned initialize path to be added to the package folder', () => {
        this.package();
        expect(this.packageFolderAddSpy.callCount).to.equal(this.filePaths.length);
      });
    });
  });
});
