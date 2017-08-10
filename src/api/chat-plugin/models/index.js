const Balance = require('./balance');
const Transaction = require('./transaction');
const Transfer = require('./transfer');

/**
 * @class
 * @name Model
 * @member {Balance} balance
 * @member {Transaction} transaction
 * @member {Transfer} transfer
 */
class Model {

  constructor(database) {
    this.balance = new Balance(database);
    this.transaction = new Transaction(database);
    this.transfer = new Transfer(database);
  }

}

module.exports = Model;
