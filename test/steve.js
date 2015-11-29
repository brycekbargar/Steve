var proxyquire =  require('proxyquire').noCallThru();
var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;

var optimist = require('optimist')();
var proxyquireStubs = { 'optimist': optimist };

describe('For the steve executable', function() {
  describe('expect the usage to be displayed when passed', function(){
    beforeEach('Setup steve', function(){
      this.steve = proxyquire('./../lib/steve.js', proxyquireStubs)(function(){}, function(){});
    });
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
    beforeEach('Setup spies', function(){
      this.startSpy = proxyquireStubs['./start.js'] = sinon.spy();
      this.packageSpy = proxyquireStubs['./package.js'] = sinon.spy();
      this.restoreSpy = proxyquireStubs['./restore.js'] = sinon.spy();
      this.watchSpy = proxyquireStubs['./watch.js'] = sinon.spy();
      this.testSpy = proxyquireStubs['./test.js'] = sinon.spy();
      this.initSpy = proxyquireStubs['./init.js'] = sinon.spy();
    });
    beforeEach('Setup steve', function(){
      this.steve = proxyquire('./../lib/steve.js', proxyquireStubs)();
    });
    it('start', function(){
      this.steve(['start']);
      expect(this.startSpy).to.have.been.calledOnce;
    });
    it('package', function(){
      this.steve(['package']);
      expect(this.packageSpy).to.have.been.calledOnce;
    });
    it('restore', function(){
      this.steve(['restore']);
      expect(this.restoreSpy).to.have.been.calledOnce;
    });
    it('watch', function(){
      this.steve(['watch']);
      expect(this.watchSpy).to.have.been.calledOnce;
    });
    it('test', function(){
      this.steve(['test']);
      expect(this.testSpy).to.have.been.calledOnce;
    });
    it('init', function(){
      this.steve(['init']);
      expect(this.initSpy).to.have.been.calledOnce;
    });
  });
});
