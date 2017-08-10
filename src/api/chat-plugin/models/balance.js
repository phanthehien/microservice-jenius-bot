const jsonQuery = require('json-query');
const { NotFoundError } = require('../../../error');

/**
 * @class
 * @name Balance
 */
class Balance {

  constructor(database) {
    this.database = database;
  }

  /**
   * @param {String} accountNumber
   */
  query({ accountNumber }) {
    return new Promise((resolve, reject) => {
      const result = jsonQuery(`users[accounts][accountNumber=${accountNumber}]`, {
        data: this.database
      }).value;

      if (!result) {
        reject(new NotFoundError(`Could not find accountNumber ${accountNumber}`));
      }

      resolve(result);
    });
  }

}

module.exports = Balance;
