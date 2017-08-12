const jsonQuery = require('json-query');
const { NotFoundError, BadUserInputError } = require('../../error-plugin');

/**
 * @class
 * @name Transfer
 */
class Transfer {

  constructor(database) {
    this.database = database;
  }

  send({ ownerAccountNumber, partnerAccountNumber, amount }) {
    return new Promise((resolve, reject) => {
      if (amount <= 0) {
        reject(new BadUserInputError('amount must be greater than zero'));
      }

      const transactionHistory = this.generateTransactionHistory({
        ownerAccountNumber,
        partnerAccountNumber,
        amount
      });

      const ownerKeys = this.findAccount(ownerAccountNumber);
      let ownerAccount = this.database.users[ownerKeys.userKey].accounts[ownerKeys.accountKey];
      ownerAccount.balance = ownerAccount.balance - amount;

      const partnerKeys = this.findAccount(partnerAccountNumber);
      let partnerAccount = this.database.users[partnerKeys.userKey].accounts[partnerKeys.accountKey];
      partnerAccount.balance = partnerAccount.balance + amount;

      this.database.transactionsInfo.push(transactionHistory);
      resolve(transactionHistory);
    });
  }

  findAccount(accountNumber) {
    const users = this.database.users;
    for (let userKey = 0; userKey < users.length; userKey++) {
      const accounts = users[userKey].accounts;
      for (let accountKey = 0; accountKey < accounts.length; accountKey++) {
        if (accounts[accountKey].accountNumber === accountNumber) {
          return {
            userKey,
            accountKey
          };
        }
      }
    }

    throw new NotFoundError(`Could not find accountNumber ${accountNumber}`);
  }

  generateTransactionHistory({ ownerAccountNumber, partnerAccountNumber, amount }) {
    const transactionId = this.generateTransactionId();
    return {
      isInternal: true,
      transactionType: {
        name: 'CARD_TOPUP',
        id: '104'
      },
      node: 'This is node sample for transaction',
      amount,
      partner: {
        identifier: '30794K',
        avatarUrl: null,
        name: 'Top up bus card',
        account: partnerAccountNumber,
        isJenius: true
      },
      fee: 500,
      ownerAccountNumber,
      category: {
        name: 'TRANSPORTATION',
        id: '4'
      },
      transactionId,
      transactionTimestamp: Date.now(),
      debitCredit: 'CREDIT'
    };
  }

  generateTransactionId() {
    const maximum = 999999999;
    const minimum = 100000000;
    const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return `MX00001${randomNumber}`;
  }
}

module.exports = Transfer;
