var proxyquire =  require('proxyquire');
var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;

var optimist = require('optimist')();

var steve = proxyquire('./../lib/steve.js', { 'optimist': optimist })(function(){}, function(){});

describe('For the steve executable', function() {
  describe('expect the usage to be displayed when passed', function(){
    beforeEach('Setup spy', function(){
      this.showHelpSpy = sinon.spy(optimist, 'showHelp');
    });
    afterEach('Teardown spy', function(){
      optimist.showHelp.restore();
    });
    it('no commands', function(){
      steve([]);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
    it('too many commands', function(){
      steve(['init', 'start']);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
    it('an unknown command', function(){
      steve(['blaargh']);
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
  });
});
