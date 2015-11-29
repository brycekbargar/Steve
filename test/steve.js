var expect = require('chai').expect;
var sinon = require('sinon');

var optimist = require('optimist');

var steve = require('./../lib/steve.js')(function(){}, function(){});

describe('For the steve executable', function() {
  describe('expect the usage to be displayed when', function(){
    beforeEach('Setup spy', function(){
      this.showHelpSpy = sinon.spy(optimist, 'showHelp');
    });
    afterEach('Teardown spy', function(){
      optimist.showHelp.restore();
    });
    it('no commands are passed', function(){
      steve();
      expect(this.showHelpSpy).to.have.been.calledOnce;
    });
  });
});
