var proxyquire =  require('proxyquire').noCallThru();
var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;

var optimist = require('optimist')();
var proxyquireStubs = { 'optimist': optimist };

describe('For the steve executable', function() {
  beforeEach('Setup console spies', function(){
    this.logSpy = sinon.spy();
    this.errorSpy = sinon.spy();
  });
  beforeEach('Setup steve', function(){
    this.steve = proxyquire('./../lib/steve.js', proxyquireStubs)(this.logSpy, this.errorSpy);
  });
  describe('expect the usage to be displayed when passed', function(){
    beforeEach('Setup spy', function(){
      this.showHelpSpy = sinon.spy(optimist, 'showHelp');
    });
    afterEach('Teardown spy', function(){
      optimist.showHelp.restore();
    });
    it('no commands', function(){
      this.steve([]);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
    it('too many commands', function(){
      this.steve(['init', 'start']);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
    it('an unknown command', function(){
      this.steve(['blaargh']);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
  });
  describe('expect the correct command to be executed for', function(){
    it('start', function(){
      var startSpy = proxyquireStubs['./start.js'] = sinon.spy();
      this.steve(['start']);
      expect(startSpy).to.have.been.calledOnce;
    });
    it('package', function(){
      var packageSpy = proxyquireStubs['./package.js'] = sinon.spy();
      this.steve(['package']);
      expect(packageSpy).to.have.been.calledOnce;
    });
    it('restore', function(){
      var restoreSpy = proxyquireStubs['./restore.js'] = sinon.spy();
      this.steve(['restore']);
      expect(restoreSpy).to.have.been.calledOnce;
    });
    it('watch', function(){
      var watchSpy = proxyquireStubs['./watch.js'] = sinon.spy();
      this.steve(['watch']);
      expect(watchSpy).to.have.been.calledOnce;
    });
    it('test', function(){
      var testSpy = proxyquireStubs['./test.js'] = sinon.spy();
      this.steve(['test']);
      expect(testSpy).to.have.been.calledOnce;
    });
    it('init', function(){
      var initSpy = proxyquireStubs['./init.js'] = sinon.spy();
      this.steve(['init']);
      expect(initSpy).to.have.been.calledOnce;
    });
  });
});
