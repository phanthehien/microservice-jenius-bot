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

      resolve(this.database.users[key]);
    });
  }

  /**
   * @param {String} username
   * @param {String} token
   */
  register({ username, token }) {
    return new Promise((resolve) => {
      setToken(username, token)
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
