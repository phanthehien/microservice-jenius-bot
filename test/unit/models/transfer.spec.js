const chai = require('chai');
const Transfer = require('../../../src/api/chat-plugin/models/transfer');
const database = require('../../../asset/test-data.json');

const { expect } = chai;

describe('Transfer model ', () => {

  beforeEach(() => {
    this.database = database;
    this.transfer = new Transfer(this.database);
  });

  it('should generate transactionId correctly', () => {
    const transactionId = this.transfer.generateTransactionId();
    const regex = /(MX00001)[0-9]{9}/gi;
    expect(regex.test(transactionId)).to.be.true;
  });

  it('should be able to find account number', () => {
    const accountNumber = '90010012672';
    const keys = this.transfer.findAccount(accountNumber);

    const user = this.database.users[keys.userKey];
    const account = user.accounts[keys.accountKey];
    expect(account.accountNumber).to.equal(accountNumber);
  });

  it('should decrease balance of owner and increase balance of partner', () => {
    const ownerAccountNumber = '90010012529';
    const partnerAccountNumber = '90010012736';
    const amount = 20000000;

    const ownerKeys = this.transfer.findAccount(ownerAccountNumber);
    const ownerAccount = this.database.users[ownerKeys.userKey].accounts[ownerKeys.accountKey];
    const ownerAccountBalance = ownerAccount.balance;

    const partnerKeys = this.transfer.findAccount(partnerAccountNumber);
    const partnerAccount = this.database.users[partnerKeys.userKey].accounts[partnerKeys.accountKey];
    const partnerAccountBalance = partnerAccount.balance;

    this.transfer.send({ ownerAccountNumber, partnerAccountNumber, amount });

    expect(ownerAccount.balance).to.equal(ownerAccountBalance - amount);
    expect(partnerAccount.balance).to.equal(partnerAccountBalance + amount);
  });

});
