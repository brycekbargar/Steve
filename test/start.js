'use strict';

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const Promise = require('bluebird');
require('sinon-as-promised')(Promise);
const stub = sinon.stub;
const expect = require('chai').use(require('sinon-chai')).expect;

const proxyquireStubs = {
  'bluebird': Promise
};

describe('For the start command', () => {
  beforeEach('Setup spies', () => {
    (proxyquireStubs['chuck-steve-vm-manager'] =
      this.chuckVmStub =
      stub())
      .returns({
        start: this.startStub = stub()
      });
  });
  beforeEach('Setup command', () => this.start = proxyquire('./../lib/start.js', proxyquireStubs));
  it('expect it to create a new vm', () => {
    this.start();
    expect(this.chuckVmStub).to.have.been.calledOnce;
    expect(this.chuckVmStub).to.have.been.calledWithNew;
  });
  it('expect it to be rejected if it can\'t start the vm', () => {
    let startError = new Error();
    this.startStub.rejects(startError);
    let start = this.start();
    expect(start).to.have.been.rejectedWith(startError);
  });
});
