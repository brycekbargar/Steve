'use strict';

const proxyquire =  require('proxyquire').noCallThru();
const sinon = require('sinon');
require('sinon-as-promised')(require('bluebird'));
const spy = sinon.spy;
const stub = sinon.stub;
const expect = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'))
  .expect;

const optimist = require('optimist')();
const proxyquireStubs = { 'optimist': optimist };

describe('For the steve executable', () => {
  beforeEach('Setup steve', () =>
    this.steve = proxyquire('./../lib/steve.js', proxyquireStubs)()
  );
  describe('expect the usage to be displayed when passed', () => {
    beforeEach('Setup Spies', () => {
      this.consoleErrorStub = stub(console, 'error');
      this.showHelpSpy = spy(optimist, 'showHelp');
    });
    afterEach('Teardown spy', () => {
      this.consoleErrorStub.restore();
      optimist.showHelp.restore();
    });
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
      it('expect execution', () => {
        this.steve(['start']);
        expect(this.startStub).to.have.been.calledOnce;
      });
      describe('expect the correct exit status for', () => {
        it('success', () => {
          let status = this.steve(['start']);
          expect(status).to.be.resolved;
        });
        it('failure', () => {
          this.startStub.returns(0);
          let status = this.steve(['start']);
          expect(status).to.be.rejected;
        });
        it('exception', () => {
          let error = new Error();
          this.startStub.throws(error);
          let status = this.steve(['start']);
          expect(status).to.be.rejectedWith(error);
        });
      });
    });
    describe('package', () => {
      beforeEach('Setup spies', () => this.packageStub = proxyquireStubs['./package.js'] = stub());
      it('expect execution', () => {
        this.packageStub.resolves(0);
        this.steve(['package']);
        expect(this.packageStub).to.have.been.calledOnce;
      });
      describe('expect the correct exit status for', () => {
        it('success', () => {
          this.packageStub.resolves(0);
          let status = this.steve(['package']);
          expect(status).to.be.resolved;
        });
        it('failure', () => {
          this.packageStub.resolves(1);
          let status = this.steve(['package']);
          expect(status).to.be.rejected;
        });
        it('exception', () => {
          let error = new Error();
          this.packageStub.rejects(error);
          let status = this.steve(['package']);
          expect(status).to.be.rejectedWith(error);
        });
      });
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
      let initStub = proxyquireStubs['./init.js'] = stub();
      initStub.resolves();
      let init = this.steve(['init']);
      expect(initStub).to.have.been.calledOnce;
      expect(init).to.have.been.resolved;
    });
  });
});
