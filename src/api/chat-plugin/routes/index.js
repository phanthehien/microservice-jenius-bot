const user = require('./user');
const findUser = require('./find-user');
const transaction = require('./transaction');
const transfer = require('./transfer');
const register = require('./register');
const authorize = require('./authorize');

module.exports = [
  user,
  findUser,
  transaction,
  transfer,
  register,
  authorize
];
