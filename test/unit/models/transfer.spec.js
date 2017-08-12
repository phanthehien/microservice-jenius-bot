const chai = require('chai');
const Transfer = require('../../../src/api/chat-plugin/models/transfer');

const { expect } = chai;

describe('Transfer model ', () => {

  beforeEach(() => {
    const database = {};
    this.transfer = new Transfer(database);
  });

  it('should generate transactionId correctly', () => {
    const transactionId = this.transfer.generateTransactionId();
    const regex = /(MX00001)[0-9]{9}/gi;
    expect(regex.test(transactionId)).to.be.true;
  });

});
