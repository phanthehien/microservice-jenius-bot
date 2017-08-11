const user = require('./user');
const transaction = require('./transaction');
const transfer = require('./transfer');
const register = require('./register');

module.exports = [
  user,
  transaction,
  transfer,
  register
];
