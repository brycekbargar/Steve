'use strict';

const proxyquire = require('proxyquire').noCallThru();
const Promise = require('bluebird');
require('sinon-as-promised')(Promise);
const sinon = require('sinon');
const spy = sinon.spy;
const stub = sinon.stub;
const expect = require('chai')
    .use(require('sinon-chai'))
    .use(require('chai-as-promised'))
    .expect;

const proxyquireStubs = {
  bluebird: Promise,
  path: {}
};

describe('For the package command', () => {
  beforeEach('Setup spies', () => {
    (this.initializeFileStub =
      proxyquireStubs['chuck-steve-initialize-file'] =
      stub())
      .returns({
        getFilePaths: this.getFilePathsStub = stub()
      });
    this.getFilePathsStub.resolves(this.filePaths = ['', '', '']);

    (this.packageFolderStub =
      proxyquireStubs['chuck-steve-package-folder'] =
      stub())
      .returns({
        isValid: this.packageFolderIsValidStub = stub(),
        clear: this.packageFolderClearStub = stub(),
        add: this.packageFolderAddStub = stub()
      });
    this.packageFolderIsValidStub.resolves(true);
    this.packageFolderClearStub.resolves();
    this.packageFolderAddStub.resolves();

    this.resolveSpy = proxyquireStubs.path.resolve = spy();
  });
  beforeEach('Setup package', () =>
    this.package = proxyquire('./../lib/package.js', proxyquireStubs)
  );
  describe('when interacting with the initialize.ck file', () => {
    it('expect the file to be loaded', () => {
      this.package();
      expect(this.initializeFileStub).to.have.been.calledOnce;
      expect(this.initializeFileStub).to.have.been.calledWithNew;
      expect(this.resolveSpy).to.have.been.calledWith('./initialize.ck');
    });
    describe('and there are errors', () => {
      beforeEach('Setup spies', () => {
        this.initializeError = new Error();
        this.getFilePathsStub.rejects(this.initializeError);
      });
      it('expect it to be rejected', () => {
        let pkg = this.package();
        expect(pkg).to.eventually.be.rejectedWith(this.initializeError);
      });
      it('expect to not continue', () => {
        let pkg = this.package();
        return pkg.catch(() => {
          expect(this.packageFolderClearStub).to.not.have.been.called;
          expect(this.packageFolderAddStub).to.not.have.been.called;
        });
      });
    });
  });
  describe('when interacting with the package folder', () => {
    it('expect the folder to be loaded', () => {
      this.package();
      expect(this.packageFolderStub).to.have.been.calledOnce;
      expect(this.packageFolderStub).to.have.been.calledWithNew;
      expect(this.resolveSpy).to.have.been.calledWith('./package');
    });
    describe('expect it to be rejected if there are errors', () => {
      describe('validating the folder', () => {
        it('because of an error', () => {
          let isValidError = new Error();
          this.packageFolderIsValidStub.rejects(isValidError);
          let pkg = this.package();
          return pkg.catch(() => {
            expect(pkg).to.be.rejectedWith(isValidError);
            expect(this.packageFolderClearStub).to.not.have.been.called;
          });
        });
        it('because it is invalid', () => {
          this.packageFolderIsValidStub.resolves(false);
          let pkg = this.package();
          return pkg.catch(() => {
            expect(pkg).to.be.rejected;
            expect(this.packageFolderClearStub).to.not.have.been.called;
          });
        });
      });
      it('clearing the folder', () => {
        let clearError = new Error();
        this.packageFolderClearStub.rejects(clearError);
        let pkg = this.package();
        return pkg.catch(() => {
          expect(pkg).to.be.rejectedWith(clearError);
          expect(this.packageFolderAddStub).to.not.have.been.called;
        });
      });
      it('adding to the folder', () => {
        let addError = new Error();
        this.packageFolderAddStub.rejects(addError);
        let pkg = this.package();
        return pkg.catch(() => expect(pkg).to.be.rejectedWith(addError));
      });
    });
    describe('and there are no errors', () => {
      it('expect the package folder to be validated', () => {
        let pkg = this.package();
        return pkg.then(() => expect(this.packageFolderIsValidStub).to.have.been.called);
      });
      it('expect the package folder to be cleared', () => {
        let pkg = this.package();
        return pkg.then(() => expect(this.packageFolderClearStub).to.have.been.called);
      });
      it('expect each returned initialize path to be added to the package folder', () => {
        let pkg = this.package();
        return pkg.then(() => expect(this.packageFolderAddStub.callCount).to.equal(this.filePaths.length));
      });
    });
  });
});
