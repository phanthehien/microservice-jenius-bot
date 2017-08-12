/**
 * @class
 * @name Transfer
 */
class Transfer {

  constructor(database) {
    this.database = database;
  }

  generateTransactionId() {
    const maximum = 999999999;
    const minimum = 100000000;
    const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return `MX00001${randomNumber}`;
  }
}

module.exports = Transfer;
