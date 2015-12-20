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
        start: this.vmStartStub = stub()
      });
    (proxyquireStubs['chuck-steve-dependency-tree'] =
      this.dependencyTreeStub =
      stub())
      .returns({
        load: this.dependencyTreeLoadStub = stub()
      });
    this.vmStartStub.resolves();
    this.dependencyTreeLoadStub.resolves();
  });
  beforeEach('Setup command', () => this.start = proxyquire('./../lib/start.js', proxyquireStubs));
  it('expect it to create a new vm', () => {
    this.start();
    expect(this.chuckVmStub).to.have.been.calledOnce;
    expect(this.chuckVmStub).to.have.been.calledWithNew;
  });
  it('expect it to create a new dependency tree', () => {
    this.start();
    expect(this.dependencyTreeStub).to.have.been.calledOnce;
    expect(this.dependencyTreeStub).to.have.been.calledWithNew;
  });
  it('expect it to be rejected if it can\'t start the vm', () => {
    let startError = new Error();
    this.vmStartStub.rejects(startError);
    let start = this.start();
    expect(start).to.have.been.rejectedWith(startError);
  });
  describe('and the vm is started', () => {
    it('expect it to be rejected if it can\'t load the dependency tree', () => {
      let dependencyError = new Error();
      this.dependencyTreeLoadStub.rejects(dependencyError);
      let start = this.start();
      expect(start).to.have.been.rejectedWith(dependencyError);
    });
  });
});
