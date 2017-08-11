// Hapi.js plugin which registers and error handler which supports automatic
// translation of the BaseError objects.

const errorPlugin = require('./plugin');
const BadUserInputError = require('./errors/BadUserInputError');
const InvalidOperationError = require('./errors/InvalidOperationError');
const NotFoundError = require('./errors/NotFoundError');

module.exports = {
  errorPlugin,
  BadUserInputError,
  InvalidOperationError,
  NotFoundError
};
