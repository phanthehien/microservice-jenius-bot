const chai = require('chai');
const User = require('../../../src/api/chat-plugin/models/user');
const database = require('../../../asset/test-data.json');

const { expect } = chai;

describe('User model ', () => {

  beforeEach(() => {
    this.database = database;
    this.user = new User(this.database);
  });

  it('should be able to find user by first name', () => {
    const firstName = 'johan';

    return this.user.find({ firstName })
      .then(users => {
        expect(users.length).to.be.greaterThan(0);
      });
  });
});
