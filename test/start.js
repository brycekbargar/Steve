describe('For the start command', () => {
  beforeEach('Setup command', () => this.start = require('./../lib/start.js'));
  it('expect to not error', () => {
    this.start();
  });
});
