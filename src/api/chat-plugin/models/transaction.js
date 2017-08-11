const jsonQuery = require('json-query');
const { NotFoundError } = require('../../error-plugin');

/**
 * @class
 * @name Transaction
 */
class Transaction {

  constructor(database) {
    this.database = database;
  }

  /**
   * @param {String} transactionId
   */
  query({ transactionId }) {
    return new Promise((resolve, reject) => {
      const key = jsonQuery(`transactionsInfo[transactionId=${transactionId}]`, {
        data: this.database
      }).key;

      if (key === null) {
        reject(new NotFoundError(`Could not find transactionId ${transactionId}`));
      }

      resolve(this.database.transactionsInfo[key]);
    });
  }

}

module.exports = Transaction;
