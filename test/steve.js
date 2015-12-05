'use strict';

const proxyquire =  require('proxyquire').noCallThru();
const spy = require('sinon').spy;
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
  describe('expect the correct command to be executed for', () => {
    it('start', () => {
      let startSpy = proxyquireStubs['./start.js'] = spy();
      this.steve(['start']);
      expect(startSpy).to.have.been.calledOnce;
    });
    it('package', () => {
      let packageSpy = proxyquireStubs['./package.js'] = spy();
      this.steve(['package']);
      expect(packageSpy).to.have.been.calledOnce;
    });
    it('watch', () => {
      let watchSpy = proxyquireStubs['./watch.js'] = spy();
      this.steve(['watch']);
      expect(watchSpy).to.have.been.calledOnce;
    });
    it('test', () => {
      let testSpy = proxyquireStubs['./test.js'] = spy();
      this.steve(['test']);
      expect(testSpy).to.have.been.calledOnce;
    });
    it('init', () => {
      let initSpy = proxyquireStubs['./init.js'] = spy();
      this.steve(['init']);
      expect(initSpy).to.have.been.calledOnce;
    });
  });
});
