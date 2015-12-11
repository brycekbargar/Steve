'use strict';

const proxyquire =  require('proxyquire').noCallThru();
const sinon = require('sinon');
const spy = sinon.spy;
const stub = sinon.stub;
const expect = require('chai').use(require('sinon-chai')).expect;

const optimist = require('optimist')();
const proxyquireStubs = { 'optimist': optimist };

describe('For the steve executable', () => {
  beforeEach('Setup console spies', () => {
    this.logSpy = spy();
    this.errorSpy = spy();
  });
  beforeEach('Setup steve', () =>
    this.steve = proxyquire('./../lib/steve.js', proxyquireStubs)(this.logSpy, this.errorSpy)
  );
  describe('expect the usage to be displayed when passed', () => {
    beforeEach('Setup spy', () => this.showHelpSpy = spy(optimist, 'showHelp'));
    afterEach('Teardown spy', () => optimist.showHelp.restore());
    it('no commands', () => {
      this.steve([]);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
    it('too many commands', () => {
      this.steve(['init', 'start']);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
    it('an unknown command', () => {
      this.steve(['blaargh']);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
  });
  describe('and the command given is', () => {
    describe('start', () => {
      beforeEach('Setup spies', () => this.startStub = proxyquireStubs['./start.js'] = stub());
      it('expect it to be executed', () => {
        this.steve(['start']);
        expect(this.startStub).to.have.been.calledOnce;
      });
      describe('expect the correct exit status for', () => {
        it('success', () => {
          this.startStub.returns(0);
          let status = this.steve(['start']);
          expect(status).to.equal(0);
        });
        it('failure', () => {
          this.startStub.returns(1);
          let status = this.steve(['start']);
          expect(status).to.equal(1);
        });
        it('exception', () => {
          this.startStub.throws(new Error());
          let status = this.steve(['start']);
          expect(status).to.equal(1);
        });
      });
    });
    it('package expect execution', () => {
      let packageSpy = proxyquireStubs['./package.js'] = spy();
      this.steve(['package']);
      expect(packageSpy).to.have.been.calledOnce;
    });
    it('watch expect execution', () => {
      let watchSpy = proxyquireStubs['./watch.js'] = spy();
      this.steve(['watch']);
      expect(watchSpy).to.have.been.calledOnce;
    });
    it('test expect execution', () => {
      let testSpy = proxyquireStubs['./test.js'] = spy();
      this.steve(['test']);
      expect(testSpy).to.have.been.calledOnce;
    });
    it('init expect execution', () => {
      let initSpy = proxyquireStubs['./init.js'] = spy();
      this.steve(['init']);
      expect(initSpy).to.have.been.calledOnce;
    });
  });
});
