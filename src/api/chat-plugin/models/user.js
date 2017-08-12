const jsonQuery = require('json-query');
const { NotFoundError } = require('../../error-plugin');
const { getToken, setToken } = require('../../../utils/redis');
const { sendPush } = require('../../../service/fcm-push');

/**
 * @class
 * @name User
 */
class User {

  constructor(database) {
    this.database = database;
  }

  /**
   * @param {String} username
   */
  query({ username }) {
    return new Promise((resolve, reject) => {
      const key = jsonQuery(`users[profile][username=${username}]`, {
        data: this.database
      }).key;

      if (key === null) {
        reject(new NotFoundError(`Could not find username ${username}`));
      }

      const user = Object.assign({}, this.database.users[key]);
      const transactions = this.getTransactions(user);
      Object.assign(user, { transactions });

      resolve(user);
    });
  }

  getTransactions(user) {
    const transactionsInfo = this.database.transactionsInfo;
    const { transactions: transactionIds } = user;

    const transactions = transactionsInfo
      .filter(info => transactionIds.indexOf(info.transactionId) >= 0);

    transactions.sort((transactionA, transactionB) => {
      return transactionB.transactionTimestamp - transactionA.transactionTimestamp;
    });

    return transactions;
  }

  /**
   * @param {String} firstName
   */
  find({ firstName }) {
    return new Promise((resolve, reject) => {
      const keys = jsonQuery(`users[profile][*firstName~/^(.*)${firstName}(.*)$/i]`, {
        data: this.database,
        allowRegexp: true
      }).key;

      if (keys.length === 0) {
        reject(new NotFoundError(`Could not find any user with firstName ${firstName}`));
      }

      const users = [];
      keys.forEach(key => {
        users.push(this.database.users[key]);
      });

      resolve(users);
    });
  }

  /**
   * @param {String} username
   * @param {String} token
   */
  register({ username, token }) {
    return new Promise((resolve) => {
      setToken(username, token);
      resolve({ result: 'success' });
    });
  }

  /**
   * @param {String} username
   * @param {String} token
   */
  authorize({ username }) {
    getToken(username).then((token) => {
      sendPush(token, 'You`ve just linked with your account.');
      return true;
    });
    return Promise.resolve(username);
  }
}

module.exports = User;
