const user = require('./user');
const transaction = require('./transaction');
const transfer = require('./transfer');
const register = require('./register');
const authorize = require('./authorize');

module.exports = [
  user,
  transaction,
  transfer,
  register,
  authorize
];
