'use strict';

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const Promise = require('bluebird');
require('sinon-as-promised')(Promise);
const stub = sinon.stub;
const expect = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'))
  .expect;

const proxyquireStubs = {
  'bluebird': Promise
};

describe('For the start command', () => {
  beforeEach('Setup spies', () => {
    (proxyquireStubs['chuck-steve-vm-manager'] = stub())
      .returns({
        start: this.vmStartStub = stub(),
        add: this.vmAddStub = stub()
      });
    (proxyquireStubs['chuck-steve-package'] = stub())
      .returns({
        getAllDependencyPaths: this.getAllDependencyPathsStub = stub()
      });
    (proxyquireStubs['chuck-steve-initialize-file'] = stub())
      .returns({
        getFilePaths: this.getFilePathsStub = stub()
      });
    this.vmStartStub.resolves();
    this.vmAddStub.resolves();
    this.getAllDependencyPathsStub.resolves(['dep1.ck', 'dep2.ck', 'dep3.ck']);
    this.getAllDependencyPathsStub.resolves(['init1.ck', 'init2.ck', 'init3.ck']);
  });
  beforeEach('Setup command', () => this.start = proxyquire('./../lib/start.js', proxyquireStubs));
  it('expect it to start the vm', () => {
    this.start();
    expect(this.vmStartStub).to.have.been.calledOnce;
  });
  it('expect it to get the dependencies', () => {
    let start = this.start();
    return start.then(() => expect(this.getAllDependencyPathsStub).to.have.been.calledOnce);
  });
  it('expect it to get the initialize files', () => {
    let start = this.start();
    return start.then(() => expect(this.getFilePathsStub).to.have.been.calledOnce);
  });
  it('expect it to add each dependency path to the vm', () => {
    let start = this.start();
    return start.then(() => expect(this.vmAddStub).to.have.been.calledThrice);
  });
});
