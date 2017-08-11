const jsonQuery = require('json-query');
const { NotFoundError } = require('../../error-plugin');

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

}

module.exports = User;
