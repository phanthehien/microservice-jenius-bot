const User = require('./user');
const Transaction = require('./transaction');
const Transfer = require('./transfer');

/**
 * @class
 * @name Model
 * @member {User} user
 * @member {Transaction} transaction
 * @member {Transfer} transfer
 */
class Model {

  constructor(database) {
    this.user = new User(database);
    this.transaction = new Transaction(database);
    this.transfer = new Transfer(database);
  }

}

module.exports = Model;
